/**
 * O Next declara apenas `*.module.css`. A partir do TypeScript 5.6, um import de
 * efeito colateral sem declaração vira erro (TS2882) — daí esta declaração para a
 * folha de estilo global.
 */
declare module '*.css'
