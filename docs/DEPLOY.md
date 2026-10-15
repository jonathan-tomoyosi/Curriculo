# Deploy

O portfólio roda em **https://curriculo.jonathan-tomoyosi.com**, num container na Lightsail
`Tomoyosi` (São Paulo, `18.229.51.94`). Até 15/10/2026 rodava na Vercel.

## Como está montado

```
internet ──443──> afiliados-nginx ──rede curriculo-borda (internal)──> curriculo-web:3100
                       │
                       └──rede afiliados_default──> painel, backend, Postgres (outro projeto)
```

A máquina hospeda outros projetos. O nginx de entrada é do repositório
`jonathan-tomoyosi/automacao-cupons` (`infra/nginx/curriculo.conf`, `docker-compose.yml`) — é a
única porta 80/443 do host, então o bloco do portfólio vive lá.

### Isolamento

| Camada | O que garante |
|---|---|
| Rede `curriculo-borda` com `internal: true` | o container não sai para a internet e não tem rota para a rede dos outros projetos; só o nginx está nas duas |
| Sem `ports:` no compose | nada do portfólio fica exposto no host; a porta 3100 só existe dentro da rede |
| `read_only`, `cap_drop: ALL`, `no-new-privileges`, usuário `node` | uma falha no Next não grava no disco do container, não escala privilégio e não altera o próprio código (os arquivos são do root) |
| `mem_limit 256m`, `cpus 0.5`, `pids_limit 128` | um abuso (ex.: rajada no PDF) não tira CPU/RAM dos outros projetos |
| nginx: só GET/HEAD, lista de caminhos, limite por IP (PDF: 6/min) | o resto é 404/405 antes de chegar ao Next |
| `resolver` + variável no `proxy_pass` | com o portfólio fora do ar o nginx continua subindo — o painel não cai junto |

A rede nasce no compose do automacao-cupons (lá está `internal: true`); aqui ela é `external`.

## Atualizar o site

Do Windows, na raiz do repositório (o servidor não tem acesso ao GitHub deste repo — vai por
`git archive`, só o que está commitado):

```bash
git archive --format=tar.gz -o /tmp/curriculo.tar.gz HEAD
scp -i ~/.ssh/Tomoyosi-AWS.pem /tmp/curriculo.tar.gz ubuntu@18.229.51.94:/tmp/
```

No servidor:

```bash
sudo install -o deploy -g deploy -m 644 /tmp/curriculo.tar.gz /home/deploy/curriculo.tar.gz
sudo -u deploy -H bash -c 'rm -rf ~/curriculo && mkdir ~/curriculo && tar -xzf ~/curriculo.tar.gz -C ~/curriculo && cd ~/curriculo && docker compose up -d --build'
```

O build roda o `verify-trace` (fontes do pdfkit no pacote). Conferir:

```bash
curl -sI https://curriculo.jonathan-tomoyosi.com/pt
curl -s -o /dev/null -w '%{http_code} %{content_type}\n' https://curriculo.jonathan-tomoyosi.com/api/cv/pt
```

## Certificado

Emitido pelo `certificado.sh` do automacao-cupons
(`sh infra/nginx/certificado.sh real curriculo.jonathan-tomoyosi.com`). A renovação é o cron
semanal que já existe lá (`renovar` renova todos os nomes).

## Do zero (máquina nova)

1. DNS `curriculo` → IP da máquina (zona da Lightsail).
2. No automacao-cupons: `docker compose --profile painel up -d --no-deps nginx` (cria a rede),
   emitir o certificado, `CURRICULO_CONF=curriculo.conf` no `.env` e recriar o nginx.
3. Aqui: enviar o código e `docker compose up -d --build`.
