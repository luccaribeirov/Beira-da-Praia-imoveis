# Beira da Praia Incorporadora — Site Institucional
### Guia de publicação no Hostinger

---

## 1. O que está incluído

```
almare-website/
├── index.html                                 → Página inicial
├── quem-somos.html                             → Quem Somos
├── empreendimentos.html                        → Listagem de empreendimentos
├── empreendimentos/
│   ├── almare-muta-residence.html              → Página do Almare Mutá Residence
│   └── estudios-vista-panorama.html            → Página dos Estúdios Vista Panorama
├── contato.html                                → Contato (formulário + WhatsApp)
├── obrigado.html                                → Página de agradecimento (pós-formulário)
├── 404.html                                     → Página de erro personalizada
├── robots.txt / sitemap.xml                     → Arquivos de SEO
└── assets/
    ├── css/style.css                            → Todo o visual do site
    ├── js/main.js                               → Menu, galeria, vídeo, animações
    ├── img/                                      → Fotos otimizadas (4 tamanhos cada)
    └── video/                                    → Vídeos institucionais (comprimidos)
```

O site é 100% HTML/CSS/JS estático — não precisa de banco de dados, PHP ou Node.
Funciona em qualquer plano de hospedagem do Hostinger (inclusive o mais básico).

---

## 2. Como visualizar no seu computador (antes de publicar)

Isso aqui **não é um aplicativo para instalar** — é um site, ou seja, um conjunto
de arquivos que um navegador (Chrome, Edge, Safari...) exibe.

Para dar uma olhada rápida:
1. Baixe o arquivo `.zip` e extraia (descompacte) em uma pasta no seu computador.
2. Entre na pasta `almare-website`.
3. Dê **duplo clique em `index.html`** — ele abre direto no seu navegador padrão,
   já com todo o visual, fotos e menus funcionando.
4. Para navegar pelas outras páginas, use o menu do próprio site (Quem Somos,
   Empreendimentos, Contato) — não precisa abrir cada arquivo manualmente.

> O único recurso que não funciona no modo "duplo clique" é o **formulário de
> contato** (ele depende de estar publicado num domínio de verdade) e as fontes
> específicas do site podem demorar um instante a mais para aparecer — tudo
> isso funciona normalmente assim que o site estiver no ar no Hostinger.

---

## 3. Como publicar no Hostinger

**Opção A — Gerenciador de Arquivos (mais simples)**
1. Acesse hPanel → **Gerenciador de Arquivos**.
2. Entre na pasta `public_html` (essa é a raiz do seu domínio).
3. Apague o arquivo `default.php` ou `index.html` de exemplo, se existir.
4. Envie **todo o conteúdo** da pasta `almare-website` (não a pasta em si —
   o conteúdo dela) para dentro de `public_html`, mantendo a estrutura de
   pastas (`assets/`, `empreendimentos/`, etc.).
5. Acesse seu domínio no navegador — o site já deve carregar.

**Opção B — FTP**
1. Em hPanel → **Contas FTP**, use os dados de acesso (ou crie um usuário).
2. Conecte com um cliente FTP (FileZilla, por exemplo).
3. Envie o conteúdo da pasta `almare-website` para `public_html`.

> 💡 Os links internos do site usam caminhos relativos (ex.: `assets/css/style.css`,
> `../assets/...` na página do Almare Mutá). Por isso funcionam tanto direto
> em `public_html` quanto dentro de uma subpasta (ex.: `public_html/site/`) —
> e também abrindo os arquivos localmente com duplo clique, como explicado
> no item 2 acima.

---

## 4. Ajustes obrigatórios antes (ou logo depois) de publicar

### a) E-mail do formulário de contato
Em `contato.html`, o formulário usa o serviço gratuito **FormSubmit**
(não exige backend, funciona em qualquer hospedagem estática).

Localize a linha:
```html
<form class="form-card" action="https://formsubmit.co/seuemail@seudominio.com.br" method="POST">
```
Troque `seuemail@seudominio.com.br` pelo e-mail que deve **receber** os
contatos do site. No primeiro envio de teste, o FormSubmit manda um
e-mail de confirmação único para essa caixa — basta clicar para ativar.
Mais detalhes em https://formsubmit.co

Na mesma seção, também há um campo `_next` apontando para
`https://seudominio.com.br/obrigado.html` — troque pela URL completa e
real do seu domínio depois de publicado, para que o visitante seja
redirecionado à página de agradecimento após enviar o formulário.

### b) Domínio nos arquivos de SEO
Os arquivos `robots.txt`, `sitemap.xml` e o bloco de dados estruturados no
topo de `empreendimentos/almare-muta-residence.html` e de
`empreendimentos/estudios-vista-panorama.html` têm o texto
`SEUDOMINIO.com.br` como placeholder. Troque pelo domínio real assim que
ele estiver ativo no Hostinger.

### c) Número de WhatsApp
Já está configurado com **+55 73 98805-0835** em todos os botões do site
(cabeçalho, rodapé, botão flutuante e cada página de empreendimento). Caso
o número mude no futuro, use "Localizar e substituir" no seu editor de
código por `5573988050835` (é o mesmo número usado em todos os links,
apenas no formato internacional sem símbolos).

### d) Redes sociais
O rodapé está pronto para receber ícones de Instagram/Facebook — foi
deixado um comentário `<!-- Adicione aqui os links reais... -->` dentro de
`.footer-brand` em cada página. Assim que vocês tiverem os perfis
oficiais, me avisem ou peça para o desenvolvedor adicionar.

---

## 5. Como adicionar um novo empreendimento no futuro

A estrutura já foi pensada para crescer — hoje já temos dois exemplos reais
para usar de referência: `empreendimentos/almare-muta-residence.html` e
`empreendimentos/estudios-vista-panorama.html`.

1. Duplique um desses arquivos e renomeie (ex.: `empreendimentos/nome-do-novo.html`).
2. Troque textos, fotos, vídeo e a tabela de condições comerciais.
3. Adicione um novo `.dev-card` em `empreendimentos.html` **e** em `index.html`
   (copie o bloco de um dos empreendimentos existentes e ajuste os dados)
   apontando para o novo arquivo.
4. Adicione o link do novo empreendimento na lista "Empreendimentos" do
   rodapé, em todas as páginas (é o mesmo bloco `<li><a href="...">` repetido).
5. Envie as novas fotos para `assets/img/` seguindo o mesmo padrão de
   nomes (ex.: `nome-do-imovel-ambiente.jpg`), e o vídeo para `assets/video/`.
6. Se o empreendimento passar a fazer parte do "em breve" da seção
   "Em expansão" (`index.html` e `empreendimentos.html`), remova a cidade
   correspondente dos chips de "novos lançamentos".

Me envie o material do próximo empreendimento (fotos + PDF de vendas) que
eu monto a página completa do mesmo jeito que fiz com os outros dois.

---

## 6. Observações técnicas

- **Vídeos institucionais:** os arquivos originais (158 MB e 217 MB) foram
  comprimidos para ~15 MB e ~27 MB mantendo boa qualidade, e só carregam
  quando o visitante clica em "play" (não consomem dados à toa). Para ainda
  mais performance no futuro, considere subir os vídeos no YouTube (modo
  "não listado") ou Vimeo e trocar o player por um embed — é só avisar que
  eu ajusto.
- **Fontes:** o site usa Google Fonts (Fraunces + Jost), carregadas
  automaticamente pela internet — não precisa instalar nada no servidor.
- **Certificado SSL:** ative o SSL gratuito do Hostinger (hPanel →
  Segurança → SSL) para o site abrir com `https://` — isso também é
  importante para o Google Maps e o WhatsApp funcionarem corretamente.
- **Mapa:** as páginas "Contato" e "Almare Mutá Residence" já têm um mapa
  do Google incorporado (sem necessidade de chave de API).

---

## 7. Checklist final antes de divulgar o link

- [ ] Domínio apontando para o Hostinger e propagado
- [ ] SSL ativado (cadeado https:// no navegador)
- [ ] E-mail do formulário de contato trocado e confirmado
- [ ] Testado o botão do WhatsApp em um celular
- [ ] Testado o formulário de contato (envio de teste)
- [ ] `SEUDOMINIO.com.br` substituído em robots.txt, sitemap.xml e nas
      páginas do Almare Mutá e do Vista Panorama
- [ ] Conferido o site no celular (menu, galeria, formulário)
