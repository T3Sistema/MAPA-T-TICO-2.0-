/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// tslint:disable
import {html, LitElement} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {MapParams} from './mcp_maps_server';

interface BairroData {
  populacao: string;
  genero: string;
  emprego: string;
  faixaEtaria: string;
  renda: string;
  empresas: string;
  perfil: string;
}

const BAIRRO_DATA: {[key: string]: BairroData} = {
  Antares: {
    populacao:
      '25.454 habitantes. O bairro apresentou grande crescimento (+86,7% de 2000 a 2010) devido a conjuntos habitacionais do programa Minha Casa Minha Vida e continuou em expansão até 2022.',
    genero:
      'Predomínio feminino (em 2010 havia 4,42% mais mulheres que homens; tendência mantida em 2022, acompanhando o padrão da cidade, que possui ~87 homens para cada 100 mulheres).',
    emprego:
      'Por ser um bairro de expansão residencial recente, grande parte da população ativa trabalha em outras regiões. A taxa de desemprego de Maceió estava em torno de 8,4% no final de 2024, mas não há dado específico do bairro.',
    faixaEtaria:
      'Adultos em idade ativa (15–64 anos) são maioria. O forte crescimento populacional por novos empreendimentos atraiu muitas famílias jovens, indicando população relativamente jovem.',
    renda:
      'Renda média baixa/média. Antares surgiu como bairro popular de conjuntos habitacionais, com renda per capita significativamente menor que bairros da zona nobre. (Ex.: em 2010 bairros periféricos como Benedito Bentes tinham renda per capita ~R$525, enquanto Ponta Verde ~R$4.432).',
    empresas:
      'Comércio local em expansão para atender à nova população. O bairro conta com cerca de 2 a 3 mil empresas ativas registradas (estimativa) – não está entre os 10 maiores polos comerciais, mas também longe dos menores. O desenvolvimento habitacional vem sendo acompanhado por abertura de lojas e serviços.',
    perfil:
      'Predominantemente residencial. Antares consiste majoritariamente em conjuntos habitacionais e loteamentos residenciais recentes, com comércio de bairro crescendo para suprir necessidades locais.',
  },
  'Barro Duro': {
    populacao:
      '14.389 habitantes. Teve crescimento modesto entre 2010 e 2022 (censo 2010 registrou ~14,4 mil hab.).',
    genero:
      'Leve maioria de mulheres. Em 2010, 53% da população eram mulheres, proporção que se manteve próxima disso em 2022 (seguindo a tendência municipal de maioria feminina).',
    emprego:
      'Bairro de classe média com algumas empresas e repartições públicas, o desemprego acompanha a média urbana (~8% em Maceió). Grande parte dos moradores trabalha em outras áreas próximas (Distrito Industrial, centro).',
    faixaEtaria:
      'Adultos de 20–59 anos. Barro Duro abriga muitas famílias em casas e condomínios, com população economicamente ativa predominante. Não é um bairro envelhecido nem de população muito jovem.',
    renda:
      'Média. Perfil socioeconômico de classe média; renda per capita em 2010 estava em nível intermediário, abaixo dos bairros litorâneos ricos porém acima dos bairros periféricos.',
    empresas:
      'Aproximadamente 1,8 mil empresas ativas. Possui comércio diversificado (supermercados, concessionárias) e instituições educacionais, mas não figura entre os maiores centros empresariais de Maceió.',
    perfil:
      'Misto Residencial/Comercial. Embora predominem áreas residenciais (casas, condomínios), o Barro Duro também abriga estabelecimentos comerciais, concessionárias e o campus do IFAL, dando caráter misto ao bairro.',
  },
  Bebedouro: {
    populacao:
      '1.128 habitantes. (Declínio acentuado): em 2010 eram 10.103 hab., e o bairro perdeu ~89% da população até 2022 devido ao desastre geológico (afundamento de solo causado pela mineração).',
    genero:
      'Sem dados atualizados pós-desocupação. Historicamente tinha maioria feminina (2010: ~54% mulheres). Após a evacuação em massa, a composição de gênero atual é incerta.',
    emprego:
      'N/A. A maioria dos moradores foi realocada; praticamente não há mercado de trabalho local restante. Antes da tragédia, Bebedouro tinha comércio e indústrias adjacentes (como a fábrica de refrigerantes) empregando moradores. Hoje o bairro está quase deserto.',
    faixaEtaria:
      'N/A. Com a saída dos habitantes, não é possível caracterizar perfil etário significativo. Era tradicionalmente um bairro antigo com população adulta e idosa, mas deixou de ter população expressiva.',
    renda:
      'Baixa. Bebedouro era um bairro de renda modesta. Atualmente, com pouquíssimos moradores, não há dado confiável – o bairro praticamente deixou de existir como unidade socioeconômica.',
    empresas:
      'Muito poucas. Antes possuía comércios de bairro; após o afundamento do solo e realocação, a maioria das empresas fechou. Em 2024, Bebedouro registrou menos de 200 empresas ativas (número exato indisponível, mas possivelmente próximo do registrado em Garça Torta ou Mutange).',
    perfil:
      'Era residencial tradicional, com comércio local. Atualmente esvaziado – casas abandonadas e ruas fechadas devido ao desastre da Braskem. O bairro perdeu sua função urbana.',
  },
  'Benedito Bentes': {
    populacao:
      '110.746 habitantes – o 2º mais populoso de Maceió (ficou atrás apenas da Cidade Universitária em 2022). Cresceu ~25,7% desde 2010.',
    genero:
      'Predominância de mulheres. Em 2010, mulheres eram cerca de 52% (3.460 a mais que homens). A diferença se manteve em 2022, alinhada ao padrão urbano (mulheres são maioria em 49 dos 50 bairros).',
    emprego:
      'Desafios de emprego local. Benedito Bentes é um bairro-dormitório de grande população; muitos trabalham em outras regiões. Sofre com desemprego mais alto nas periferias – a taxa de desocupação provavelmente supera a média da capital (8%), dada a renda mais baixa e concentração de jovens. Há programas municipais de capacitação no bairro para melhorar a empregabilidade.',
    faixaEtaria:
      'Jovem/Adulto. É um bairro de ocupação mais recente (décadas de 1980-90) e grande número de crianças e jovens. A maioria tem menos de 40 anos, com muitas famílias jovens; a parcela de idosos é relativamente pequena.',
    renda:
      'Baixa. Benedito Bentes possui uma das menores rendas per capita de Maceió – em 2010 era cerca de R$525 por mês, muito inferior aos bairros nobres. Isso reflete o perfil socioeconômico popular, com alta vulnerabilidade e muitos lares de baixa renda.',
    empresas:
      '9.338 empresas ativas (registradas) – ocupa o 4º lugar em Maceió nesse quesito. Apesar de ser periférico, seu enorme contingente populacional atraiu comércio significativo (supermercados, lojas, serviços). Ainda assim, muitos empreendimentos são de pequeno porte (microempresas e MEIs).',
    perfil:
      'Residencial, de caráter popular. É um conjunto de grandes conjuntos habitacionais e loteamentos, funcionando como cidade-dormitório. Nos últimos anos vem ganhando traços mistos, com surgimento de centro comercial próprio (shoppings, galerias) e prestação de serviços para atender sua população de mais de 100 mil habitantes.',
  },
  'Bom Parto': {
    populacao:
      '8.010 habitantes. Sofreu redução populacional na última década (era ~12,8 mil em 2010) devido em parte ao impacto do desastre geológico que afetou bairros vizinhos.',
    genero:
      'Mulheres são maioria. Em 2010 havia 5,29% mais mulheres; mantém-se essa predominância feminina comum aos bairros centrais de Maceió.',
    emprego:
      'Moderado. Bom Parto é próximo à área central e industrial (próximo ao bairro Prado e ao porto). Parte dos moradores trabalha em indústrias e serviços na região. A taxa de desemprego deve girar em torno da média urbana (8–9%). A desativação de áreas afetadas pelo afundamento de solo (proximidade do Mutange) impactou negativamente oportunidades locais.',
    faixaEtaria:
      'Adultos jovens. Antes um bairro operário tradicional, hoje com população diminuída, restam famílias de faixa etária variada. Provavelmente predomina a faixa 20–59 anos, com menos crianças após a saída de muitos moradores.',
    renda:
      'Baixa a média-baixa. Bairro de origem humilde, com renda inferior à média da cidade. Apresentava indicadores socioeconômicos modestos já em 2010 (alta concentração de famílias de baixa renda). A situação não melhorou, dado o êxodo populacional e poucos investimentos.',
    empresas:
      'Poucas. Bom Parto não figura entre os principais polos comerciais. Estima-se na casa de algumas poucas centenas de empresas ativas (provavelmente <1000). O comércio é local e houve fechamento de estabelecimentos em áreas evacuadas.',
    perfil:
      'Historicamente residencial popular, com algumas indústrias e oficinas. Após os problemas geológicos, parte do bairro está esvaziada, mas nas porções habitadas mantém-se como zona residencial de baixa renda, com comércios e serviços básicos de bairro.',
  },
  Canaã: {
    populacao:
      '4.929 habitantes. Crescimento populacional discreto em comparação a 2010 (quando tinha ~5.025 hab.), indicando leve declínio.',
    genero:
      'Maioria feminina, seguindo a tendência geral (2010: ~52% mulheres). Não há mudanças significativas nesse equilíbrio; mulheres continuam ligeiramente predominantes.',
    emprego:
      'Elevado desemprego relativo. Canaã é um bairro de origem humilde, possuindo limitações de oportunidades locais. A desocupação tende a ser alta, acima da média municipal, dado o baixo nível de renda e qualificação dos moradores. Grande parte trabalha em subempregos ou empregos informais em outros locais.',
    faixaEtaria:
      'Jovem/Adulto jovem. Por ser bairro de população carente, geralmente há muitas crianças e adolescentes, mas a maior parcela está na faixa economicamente ativa (20–40 anos). Provavelmente há alta proporção de jovens em relação a bairros centrais.',
    renda:
      'Baixa. Canaã está entre os bairros de menor renda de Maceió. Caracteriza-se por habitações simples e renda domiciliar per capita próxima à linha de pobreza. Em 2010 já apresentava indicadores socioeconômicos fracos, situando-se na porção inferior da distribuição de renda urbana.',
    empresas:
      'Muito poucas. O bairro dispõe basicamente de mercadinhos, pequenos comércios familiares e serviços informais. O número de empresas registradas é baixo (provavelmente na casa de dezenas). Canaã não aparece em rankings de empresas, evidenciando sua pouca atividade empresarial formal.',
    perfil:
      'Residencial de baixa renda. Trata-se de uma comunidade de caráter habitacional popular, com urbanização precária. O bairro é majoritariamente dormitório, com mínima presença comercial (apenas o essencial, como mercadinhos, igreja, etc.).',
  },
  Centro: {
    populacao:
      '2.012 habitantes. (Queda acentuada) – em 2000 possuía 3.710 hab., decrescendo 46% até 2022. Essa diminuição expressiva se deve à transformação do centro em área comercial com esvaziamento residencial.',
    genero:
      'Maioria feminina. Em 2010, 54% da população do Centro eram mulheres (2.818 mulheres vs. 2.818 homens?) – na verdade, havia cerca de uma mulher e meia para cada homem. A tendência de predomínio feminino permanece.',
    emprego:
      'Polarizado. Como coração comercial da cidade, o Centro abriga milhares de empregos formais no comércio e serviços públicos durante o dia. Entretanto, quase não há moradores ativos – muitos prédios residenciais se converteram em estabelecimentos comerciais. A taxa de desemprego dos residentes não é representativa (população residente pequena); a região em si atrai trabalhadores de toda Maceió.',
    faixaEtaria:
      'Idosos e adultos. Os moradores remanescentes incluem população idosa que permaneceu nos poucos edifícios residenciais restantes. A vida noturna é reduzida e poucas crianças residem na região central.',
    renda:
      'Média/Alta (entre residentes). Os poucos moradores tendem a ser de classe média (alguns comerciantes, aposentados). Mas de forma geral, o dado de renda residencial é pouco significativo dado o êxodo populacional. No horário comercial, circulam pessoas de todas as faixas de renda trabalhando/comprando.',
    empresas:
      '5.874 empresas ativas registradas – o Centro é tradicionalmente o maior polo comercial de Maceió. Concentra lojas de varejo, escritórios, bancos e órgãos públicos. O número elevado de empresas reflete essa vocação de centro de negócios da capital.',
    perfil:
      'Comercial. O Centro de Maceió deixou de ser um bairro residencial e hoje é quase inteiramente voltado ao comércio e serviços, funcionando intensamente nos dias úteis e esvaziando à noite. Prédios residenciais antigos foram convertidos em lojas e escritórios, e a ocupação é predominantemente diurna.',
  },
  'Chã da Jaqueira': {
    populacao:
      '13.964 habitantes. Apresentou redução populacional desde 2010 (quando tinha ~16,6 mil hab.), possivelmente ligada à saturação do bairro e pouca expansão física.',
    genero:
      'Mulheres prevalecem. Em 2010 elas eram ligeiramente maioria (aprox. 50,5%) – temos continuidade desse leve predominio feminino típico.',
    emprego:
      'Desemprego moderado/alto. Chã da Jaqueira é um bairro popular e densamente habitado, com oportunidades de emprego limitadas localmente. Muitos moradores dependem de empregos informais ou deslocam-se para trabalhar em outras áreas. A taxa de desocupação estimada é acima da média urbana, dado o perfil socioeconômico (provavelmente na faixa de dois dígitos).',
    faixaEtaria:
      'Adultos Jovens. Trata-se de um bairro com muitas famílias e crianças, mas a faixa de 20–49 anos tende a ser a mais numerosa. A população é relativamente jovem, com presença significativa de crianças/adolescentes em comparação a bairros centrais.',
    renda:
      'Baixa. Índices de renda e desenvolvimento humano abaixo da média de Maceió. A Chã da Jaqueira é conhecida por habitações simples e renda per capita baixa, enquadrando-se entre os bairros de menor renda na capital (dados de 2010 já indicavam isso).',
    empresas:
      'Poucas. O bairro dispõe basicamente de pequenos comércios (mercadinhos, padarias) e prestadores de serviço locais. Não aparece entre os bairros com maior quantidade de empresas; estima-se algo em torno de poucas centenas de negócios registrados.',
    perfil:
      'Residencial de baixa renda. É um bairro periférico e adensado, com moradias populares e infraestrutura carente. Possui caráter dormitório, com vida de bairro típica e comércio pequeno apenas para atender os moradores.',
  },
  'Chã de Bebedouro': {
    populacao:
      '8.632 habitantes. Teve declínio populacional (era ~10,5 mil em 2010), em parte devido ao impacto da instabilidade do solo na região próxima à encosta da lagoa Mundaú.',
    genero:
      'Maioria feminina. Em 2010, mulheres representavam cerca de 52,0% da população local. A tendência se manteve com leve vantagem feminina, como observado na maioria dos bairros de Maceió.',
    emprego:
      'Alto desemprego/localidade fragilizada. A Chã de Bebedouro sempre foi uma comunidade carente, e com os problemas estruturais (afundamento de solo que atingiu adjacências), a atividade econômica local retraiu. O desemprego entre moradores provavelmente ultrapassa a média municipal, com muitos vivendo de subempregos.',
    faixaEtaria:
      'Adultos jovens e crianças. É um bairro de população de baixa renda, historicamente com muitas crianças. Ainda assim, a maior parcela é de adultos até ~50 anos. O êxodo de parte dos moradores afetou possivelmente famílias com crianças (buscando áreas mais seguras).',
    renda:
      'Baixa. Assim como Bebedouro, a Chã de Bebedouro é um dos bairros mais pobres. Renda domiciliar per capita muito baixa, próxima ou abaixo do salário mínimo por família. A vulnerabilidade social é alta.',
    empresas:
      'Muito poucas. O bairro tem perfil quase rural em partes, com poucos comércios formais. Deve contar com algumas dezenas de empresas no máximo – basicamente mercearias e serviços informais para atender os moradores.',
    perfil:
      'Residencial periférico. Com habitações simples em área de encosta e às margens da lagoa, Chã de Bebedouro é essencialmente um bairro residencial de baixa renda. Possui pouca estrutura comercial e vem sofrendo esvaziamento e abandono em certas partes por conta de riscos geológicos.',
  },
  'Cidade Universitária': {
    populacao:
      '118.017 habitantes – bairro mais populoso de Maceió (crescimento de 65% desde 2010). Recebeu +46,5 mil moradores na última década, superando Benedito Bentes em população após ampla expansão habitacional planejada.',
    genero:
      'Maioria feminina. Segue o padrão municipal: proporção em torno de 53% mulheres. Em 2010 já havia leve maioria de mulheres (aprox. 51%, diferença aumentou com a urbanização recente atraindo muitas mães de família).',
    emprego:
      'Dinâmico, mas em transição. Tradicionalmente bairro dormitório, a Cidade Universitária começou a atrair investimentos e empregos localmente (shoppings, centros logísticos, universidade). Ainda assim, muitos residentes trabalham em outras partes da cidade. A taxa de desemprego tende a acompanhar a média (entre 8–10%). O nome deriva da UFAL, grande empregadora situada na região.',
    faixaEtaria:
      'Jovem/Adulto jovem. O boom habitacional trouxe muitas famílias jovens e beneficiários de conjuntos residenciais. A maioria da população está abaixo dos 40 anos; há alta concentração de crianças e jovens adultos.',
    renda:
      'Baixa/Média-baixa. Apesar do crescimento, grande parte dos moradores veio de programas habitacionais e possui renda modesta. No geral a renda per capita está abaixo da média de Maceió – embora haja bolsões de classe média emergente, o bairro ainda tem perfil socioeconômico popular.',
    empresas:
      '12.416 empresas ativas – o maior número em Maceió. Isto equivale a 1 empresa para cada ~9,5 habitantes, o que destaca o surgimento de um polo comercial local. Nos últimos anos, abriram inúmeras lojas, serviços e indústrias leves para atender à população crescente.',
    perfil:
      'Misto em expansão. Originalmente residencial, o bairro mantém vastas áreas habitacionais (grandes conjuntos como Maceió I, etc.), mas tornou-se cada vez mais misto, com shopping centers, atacarejos, campus universitário e outros empreendimentos econômicos. É uma nova centralidade urbana de Maceió.',
  },
  'Clima Bom': {
    populacao:
      '50.386 habitantes. Representa quase 5% da população municipal, embora tenha tido leve declínio em relação a 2010 (quando tinha ~55,9 mil hab. – queda de ~10% até 2022).',
    genero:
      'Mulheres ligeiramente maioria. No censo anterior, cerca de 52% eram mulheres. Mantém-se essa predominância feminina, comum aos bairros da parte alta de Maceió.',
    emprego:
      'Desafio de emprego local. O Clima Bom é um bairro popular extenso, com relativamente poucas empresas de grande porte. Muitos moradores dependem de empregos no centro ou noutras regiões. Assim, o desemprego e subemprego são significativos – a taxa estimada supera a média urbana, refletindo a condição socioeconômica modesta local.',
    faixaEtaria:
      'Adultos Jovens. Apresenta distribuição etária típica de bairro periférico consolidado: grande proporção de crianças e jovens, mas a maioria dos habitantes tem entre 15 e 59 anos. A densidade populacional alta indica muitas famílias com filhos.',
    renda:
      'Baixa. Trata-se de um dos bairros mais carentes em infraestrutura e renda. A renda média per capita situa-se entre as menores de Maceió, semelhante a bairros como Vergel do Lago e Canaã. Grande parte das famílias vive com renda mensal per capita próxima a 1 salário mínimo ou menos.',
    empresas:
      '5.388 empresas ativas registradas. Apesar da baixa renda, o Clima Bom figura entre os 10 bairros com mais empresas, o que reflete seu tamanho populacional – predominam pequenos comércios, oficinas e prestadores de serviços voltados à comunidade local. Há também um polo de confecções e feiras livres conhecidas na cidade.',
    perfil:
      'Residencial popular. O Clima Bom consiste sobretudo em loteamentos habitacionais de baixa renda e conjuntos populares. Possui comércio local forte (mercados, lojas de bairro), mas permanece essencialmente um bairro dormitório de classes trabalhadoras, com urbanização densa e problemas sociais.',
  },
  'Cruz das Almas': {
    populacao:
      '12.104 habitantes. Continuou crescendo (censo 2010 registrou ~11,7 mil) impulsionado pela expansão imobiliária na orla norte de Maceió.',
    genero:
      'Maioria feminina, mas quase equilibrado. Em 2010 eram ~53% mulheres. Essa pequena vantagem feminina persiste, em linha com o quadro geral urbano.',
    emprego:
      'Moderado. Cruz das Almas abriga o Parque Shopping Maceió e hotéis, gerando empregos no comércio e turismo. Muitos moradores trabalham nesses estabelecimentos ou em serviços na região litorânea. A proximidade da zona hoteleira gera oportunidades, de modo que o desemprego local pode ser um pouco menor que em bairros periféricos – ainda assim, parte significativa da população é de baixa renda e enfrenta informalidade.',
    faixaEtaria:
      'Adultos jovens. É um bairro litorâneo relativamente recente, atraindo moradores de classe média e também ocupações informais. A maioria tem entre 20 e 50 anos. Há presença tanto de estudantes (por conta de faculdades próximas) quanto de famílias jovens fixadas nos conjuntos residenciais da região.',
    renda:
      'Heterogênea (baixa a média). Cruz das Almas possui áreas nobres (próximas à praia) com condomínios de melhor renda e também bolsões de ocupação precária. Em média, a renda per capita é moderada, inferior à dos bairros vizinhos Jatiúca/Ponta Verde, mas superior à de bairros periféricos.',
    empresas:
      '~2.000 empresas ativas (estimativa). Destacam-se o shopping center, supermercados e hotéis como principais empreendimentos. Fora isso, existem restaurantes, bares e comércios ligados ao turismo de praia. Não está entre os maiores polos empresariais, mas tem importância econômica setorial (lazer e turismo).',
    perfil:
      'Misto (turístico e residencial). O bairro combina residências (prédios e conjuntos habitacionais) com forte presença comercial na orla (hotéis, shopping, restaurantes). É uma área em transição, consolidando-se como extensão da zona turística de Jatiúca, porém ainda com características residenciais nos trechos afastados da praia.',
  },
  Farol: {
    populacao:
      '17.789 habitantes. Manteve-se estável comparado a 2010 (16,8 mil hab.), com pequeno aumento. É um bairro tradicional de classe média.',
    genero:
      'Predomínio feminino. Em 2010, 53% da população do Farol era de mulheres. Esse padrão se mantém, fazendo do Farol um dos bairros com maior proporção de mulheres (aprox. 54% em 2010).',
    emprego:
      'Baixo desemprego relativo. O Farol concentra repartições públicas, colégios e empresas médias, além de estar próximo ao centro. Muitos moradores possuem empregos formais (servidores públicos, profissionais liberais). A taxa de desemprego entre residentes tende a ser menor que a média de Maceió, dado o perfil socioeconômico mais elevado e oportunidades na região.',
    faixaEtaria:
      'Adultos e Idosos. Por ser um bairro estabelecido e valorizado, abriga muitas famílias tradicionais e população envelhecendo no local. Há presença significativa de idosos, mas a faixa 30–59 anos ainda é majoritária. Menores de 15 anos são porcentagem relativamente pequena no Farol.',
    renda:
      'Alta/Média-alta. O Farol está entre os bairros de melhor renda de Maceió (embora abaixo apenas dos bairros litorâneos mais ricos). Em 2010 apresentava renda per capita bem acima da média da cidade. Caracteriza-se por moradores de classe média alta, com muitos lares de profissionais qualificados.',
    empresas:
      '5.298 empresas ativas, o que coloca o Farol entre os 10 bairros com mais empresas. Há inúmeras clínicas, escolas, escritórios, além de comércio variado ao longo das avenidas Fernandes Lima e Moreira e Silva. Esse expressivo número de negócios reforça o caráter urbano e autosuficiente do bairro.',
    perfil:
      'Misto tendendo ao residencial. O Farol é um bairro residencial de classe média, marcado por casas e edifícios, mas com forte presença de comércio e serviços nas vias principais (é cortado pela principal avenida da cidade). Assim, combina tranquilidade residencial nas ruas internas com intenso uso comercial nas arteriais – um perfil misto e bem estruturado.',
  },
  Feitosa: {
    populacao:
      '26.786 habitantes. Diminuiu levemente em relação a 2010 (quando tinha ~30,3 mil), possivelmente por saturação e migração para bairros novos.',
    genero:
      'Maioria de mulheres. Em 2010, as mulheres eram cerca de 51%–52% (diferença de ~915 pessoas). A proporção feminina permaneceu um pouco acima da masculina até 2022.',
    emprego:
      'Moderado. O Feitosa está em área intermediária da cidade, com acesso ao centro. Conta com comércio local e proximidade de pólos geradores de emprego (como a Av. Fernandes Lima). Parte dos moradores trabalha nas adjacências (Farol, Centro), o que favorece menor desemprego que bairros periféricos. Ainda assim, há bolsões de baixa renda no Feitosa, implicando alguma dificuldade de emprego para uma parcela.',
    faixaEtaria:
      'Adultos Jovens. É um bairro heterogêneo, com conjuntos habitacionais e áreas de classe média. Predominam moradores de 20–50 anos, muitos com filhos em idade escolar. A população infantil e idosa existem em quantidade moderada, sem extremidades marcantes.',
    renda:
      'Média-baixa a média. O Feitosa tem setores mais carentes (p. ex. entorno do Campo do Regatas) e outros de classe média. Em média, a renda per capita fica um pouco abaixo da média de Maceió, mas não tão baixa quanto bairros periféricos extremos. Situa-se numa faixa intermediária de renda urbana.',
    empresas:
      '~2.489 empresas (estimativa). Possui comércio relevante em algumas vias (lojas de materiais de construção, supermercados) e concentra o Conjunto José da Silva Peixoto com atividade econômica local. Não está entre os maiores centros comerciais, mas atende bem os residentes.',
    perfil:
      'Residencial, com elementos comerciais locais. O Feitosa é majoritariamente uma zona residencial (casas e prédios de apartamentos médios), contando com comércio de bairro e algumas instituições (escolas, clubes). Não é um polo comercial da cidade, mas oferece serviços suficientes internamente, caracterizando um bairro residencial autossuficiente em boa medida.',
  },
  'Fernão Velho': {
    populacao:
      '5.392 habitantes. Teve ligeira queda populacional desde 2010 (5,7 mil hab.), mantendo-se um bairro pequeno.',
    genero:
      'Ligeira maioria feminina. Tradicionalmente, ~51% da população de Fernão Velho são mulheres. A diferença sempre foi pequena, dado o perfil comunitário equilibrado do local.',
    emprego:
      'Baixo dinamismo econômico. Fernão Velho é um bairro isolado e histórico (antiga vila fabril), com poucas oportunidades de emprego local – havia uma antiga fábrica têxtil que fechou. Muitos residentes trabalham em outras regiões ou vivem de atividades informais. A taxa de desemprego tende a ser alta localmente devido à escassez de vagas no próprio bairro.',
    faixaEtaria:
      'Adultos e idosos. Por ser uma comunidade tradicional, há muitos moradores antigos. A população jovem migra bastante em busca de estudo/trabalho. Assim, há proporção significativa de pessoas de meia-idade e idosos permanecendo no bairro, embora ainda haja presença de crianças.',
    renda:
      'Baixa/Média-baixa. Fernão Velho tem características semi-rurais, com nível socioeconômico modesto. A renda média das famílias é baixa, sustentada por aposentadorias ou trabalhos informais em muitos casos. Não se destaca em riqueza – está abaixo da média municipal em rendimento.',
    empresas:
      '436 empresas ativas – um dos menores quantitativos de Maceió. Basicamente pequenos comércios (mercadinhos, farmácia) e alguns artesãos. A economia local é bem limitada, reflexo do isolamento geográfico e do fechamento de indústrias que outrora funcionaram na localidade.',
    perfil:
      'Residencial e histórico. Fernão Velho é um bairro residencial tranquilo, de origem operária, with traços quase de vilarejo. Tem importância histórica e cultural, mas pouca atividade comercial/industrial atual. Funciona como uma vila residencial longe do centro urbano, com modo de vida comunitário.',
  },
  'Garça Torta': {
    populacao:
      '1.890 habitantes. Pouco mudou desde 2010 (1.635 hab.), mantendo-se um dos bairros menos populosos de Maceió.',
    genero:
      'Maioria feminina (levemente). Em 2010 eram ~50,2% mulheres – praticamente equilíbrio. Em 2022 a diferença continua mínima, com mulheres ligeiramente predominantes (apenas 40 a mais que homens em 2010, único bairro nessa situação inversa). Nota: Garça Torta e Pescaria são exceções onde a população masculina chegou a se equiparar ou superar a feminina.',
    emprego:
      'Vinculado ao turismo e pesca. Garça Torta é uma comunidade litorânea de veraneio, com poucas oportunidades formais. Muitos moradores vivem da pesca, do artesanato ou do emprego em pousadas e restaurantes na região. O desemprego formal pode ser alto, mas a subsistência é complementada por atividades sazonais ligadas ao turismo de praia.',
    faixaEtaria:
      'Adulta. A população é pequena e inclui famílias tradicionais do lugar (pescadores) – ou seja, adultos de meia idade e idosos – e alguns jovens atraídos pela cena cultural (o bairro é conhecido por bares de praia). Não há muitos crianças, pois é um local que não vem crescendo demograficamente; a maioria está na faixa 30–60 anos.',
    renda:
      'Baixa/Média-baixa. Apesar de estar na área litorânea norte, Garça Torta não é um bairro rico – é uma vila de pescadores e artistas, com renda modesta. Há algumas residências de alto padrão (veraneio), mas a maioria dos moradores fixos tem renda baixa, dependente da pesca e turismo informal.',
    empresas:
      '199 empresas ativas registradas – figura entre os 5 bairros com menor número de empresas de Maceió. Consiste basicamente em bares, restaurantes de praia e pequenas pousadas, além de mercearias. A economia é bem restrita e voltada ao lazer e serviços básicos.',
    perfil:
      'Residencial/Pesqueiro com vocação turística. Garça Torta preserva o ar de vila praiana: casario simples, colônia de pescadores e alguns estabelecimentos turísticos. É predominantemente residencial rural (no sentido de baixa densidade) com atividade turística em expansão moderada (bares de praia famosos). O ambiente é tranquilo e pouco urbanizado.',
  },
  'Gruta de Lourdes': {
    populacao:
      '15.160 habitantes. Aumentou levemente desde 2010 (14,3 mil hab.), consolidando-se como bairro de médio porte.',
    genero:
      'Maioria feminina. Em 2010 as mulheres representavam ~53%. A Gruta segue a tendência de bairros urbanos com pequeno excedente de população feminina.',
    emprego:
      'Moderado/Baixo. A Gruta de Lourdes é um bairro classe média emergente, com vários condomínios e clínicas (fica próxima a hospitais). Muitos moradores trabalham no setor de serviços de saúde ou no comércio próximo (como no Farol e Mangabeiras). Com isso, o desemprego tende a ser relativamente baixo entre os residentes, comparável a bairros vizinhos de classe média.',
    faixaEtaria:
      'Adultos de meia idade. O bairro atraiu muitas famílias em condomínios verticais nas últimas décadas. Assim, predomina a faixa 30–59 anos, geralmente casais com filhos adolescentes. Há presença de idosos (devido à tranquilidade da área) e alguma população infantil, mas a estrutura etária é equilibrada sem superávit de jovens.',
    renda:
      'Média. A Gruta apresenta nível de renda próximo à média da capital, ou ligeiramente acima. Não atinge o topo como Ponta Verde, mas está bem acima de bairros periféricos. Em 2010, o bairro tinha um IDH alto dentro do contexto de Maceió, indicando renda domiciliar per capita razoável (classe média).',
    empresas:
      '~2.538 empresas (estimado). A Gruta possui um polo de saúde importante – concentra clínicas, laboratórios e o Hospital Universitário nas imediações – o que incrementa o número de empresas. Também há supermercados e comércio local. Não está entre os 10 maiores polos, porém tem atividade econômica significativa vinculada à saúde e educação (várias faculdades próximas).',
    perfil:
      'Residencial de classe média, com polo médico. O bairro é majoritariamente residencial, composto por condomínios e loteamentos de padrão médio. Destaca-se, entretanto, pelo perfil misto dado o cluster de saúde (clínicas, hospitais) e algumas sedes de empresas. É uma área urbana em expansão vertical, combinando morar e trabalhar (sobretudo em saúde e serviços educacionais).',
  },
  Guaxuma: {
    populacao:
      '3.606 habitantes. Teve crescimento expressivo (+45% entre 2010 e 2022), porém ainda é pouco populoso. Consiste em loteamentos e condomínios na costa norte.',
    genero:
      'Equilíbrio/Maioria feminina. Em 2010, mulheres eram ligeiramente predominantes (~50,6%). Em 2022, com mais moradores, mantém-se um leve predomínio feminino (não significativo).',
    emprego:
      'Vinculado ao turismo e serviços. Guaxuma abriga condomínios de veraneio e algumas barracas de praia. Há poucas fontes de emprego locais – moradores em idade ativa tendem a trabalhar em outras partes da cidade. O desemprego formal é baixo em números absolutos (população pequena), mas muitos empregos disponíveis são sazonais do turismo. Assim, a taxa de desocupação formal pode não ser alta, considerando que muitos residentes são aposentados ou veranistas.',
    faixaEtaria:
      'Adultos. A demografia inclui famílias de classe média e alguns idosos que moram em condomínios de praia. A maior parte está na faixa adulta (30–60 anos). Há poucas crianças (não é um bairro tradicional de famílias numerosas) e alguns idosos aproveitando a vida litorânea.',
    renda:
      'Média/Alta. Guaxuma tem perfil socioeconômico mais elevado que os bairros centrais populares – muitos moradores são de classe média alta que compraram casas de praia ou moram em condomínios fechados. Portanto, a renda média per capita do bairro está acima da média de Maceió, embora não tanto quanto Ponta Verde. Contrasta com a vila tradicional de pescadores (que existia, mas foi sendo deslocada).',
    empresas:
      '283 empresas ativas – número bastante baixo (está entre os últimos no ranking). O comércio local se resume a alguns restaurantes, mercadinhos e empreendimentos turísticos. A economia do bairro é incipiente, focada basicamente no lazer de praia e serviços domésticos dos condomínios.',
    perfil:
      'Residencial de baixa densidade (balneário). Guaxuma é essencialmente um bairro residencial à beira-mar, com condomínios e residências de veraneio. Possui vocação turística incipiente (devido à praia), mas ainda é em grande parte uma área de moradia tranquila, afastada do centro urbano e com pouca infraestrutura comercial.',
  },
  Ipioca: {
    populacao:
      '8.116 habitantes. Crescimento populacional discreto (+7% sobre 2010, que tinha 7.580 hab.). Mantém-se um bairro semi-urbano na extremo norte.',
    genero:
      'Maioria feminina moderada. Em 2010 mulheres eram ~51% dos residentes. Essa leve predominância se mantém – há um pequeno excedente de mulheres na população.',
    emprego:
      'Economia local limitada. Ipioca é um bairro litorâneo histórico (terra natal de Marechal Deodoro) com características rurais. As atividades econômicas principais são pesca, agricultura de subsistência e recentemente turismo (resorts nas proximidades). O desemprego formal é alto, pois poucos empregos formais existem no bairro. Muitos moradores dependem de trabalho informal e programas sociais.',
    faixaEtaria:
      'Adultos e jovens. A população é relativamente jovem, com muitas famílias tradicionais – há crianças e adolescentes em número significativo. Contudo, a faixa 20–50 anos predomina. Ipioca não tem população idosa numerosa, exceto figuras antigas da comunidade, pois muitos jovens acabam migrando para oportunidades na cidade.',
    renda:
      'Baixa. Ipioca está entre os bairros de renda mais baixa, por sua natureza semi-rural e isolada. A maioria das famílias tem renda per capita muito baixa, muitas vivendo da pesca e pequenos negócios informais. Contrasta com os empreendimentos turísticos de luxo instalados próximos, cujos benefícios econômicos pouco se distribuem localmente.',
    empresas:
      'Não muitas. O bairro conta com comércio básico (mercados, farmácias) e alguns estabelecimentos turísticos (pousadas, restaurantes) na praia de Ipioca. O número de empresas é relativamente pequeno – possivelmente algumas centenas. Não aparece nas listas de bairros com mais empresas, indicando atividade empresarial modesta.',
    perfil:
      'Residencial tradicional/pesqueiro. Ipioca é em essência uma vila residencial e de pescadores, com patrimônio histórico. Ultimamente ganhou contornos de destino turístico, mas sem descaracterizar seu perfil de vila litorânea. Assim, convive uma população local de baixa renda (em áreas internas) com empreendimentos turísticos isolados na orla.',
  },
  Jacarecica: {
    populacao:
      '9.660 habitantes. Crescimento acelerado de +68% desde 2010 – um dos maiores aumentos proporcionais, impulsionado por novos condomínios e conjuntos na região norte.',
    genero:
      'Maioria de mulheres. Em 2010 mulheres eram ~52,6%. Em 2022 mantiveram-se ligeiramente à frente. Jacarecica segue o padrão de quase todos os bairros (mais mulheres que homens).',
    emprego:
      'Em transição. Tradicionalmente uma área semi-rural, Jacarecica passou por urbanização recente (shoppings, residenciais) e agora abriga alguns empregos no comércio (ex.: Shopping Parque). Ainda assim, boa parte dos moradores depende de trabalhos fora ou informais. O desemprego pode ter diminuído um pouco com as novas oportunidades, mas ainda deve rondar níveis medianos para Maceió.',
    faixaEtaria:
      'Adultos jovens. Com novos empreendimentos residenciais, chegaram muitas famílias novas – perfil demográfico rejuvenescido. Predominam pessoas de 20–40 anos e seus filhos crianças. A proporção de idosos é baixa, pois o bairro “renasceu” populacionalmente há pouco tempo.',
    renda:
      'Média-baixa. Jacarecica mescla áreas de ocupação simples com condomínios fechados. Em média, a renda ainda é relativamente modesta – melhorou com a chegada de moradores de classe média nos condomínios, mas grande parte da população original tem renda baixa (pescadores, trabalhadores informais). Assim, a renda média fica abaixo da média urbana, porém com alta desigualdade interna.',
    empresas:
      'Cerca de 1.500–2.000 empresas ativas (estimativa). Com a construção do shopping e proximidade da Av. Fernandes Lima (na extensão para Litoral Norte), Jacarecica ganhou dezenas de lojas, além de possuir o polo de material de construção (home centers) da região. Não figura no top 10, mas supera bairros pequenos. Há ainda comércio ligado à praia e serviços locais.',
    perfil:
      'Misto em crescimento. Jacarecica está se transformando: de colônia de pescadores rural para um bairro misto, com novos condomínios residenciais e equipamentos comerciais (shopping, hipermercados). Ainda conserva bolsões residenciais tradicionais e áreas pouco urbanizadas, mas a tendência é de intensa expansão urbana planejada, tornando-o cada vez mais integrado à malha urbana de Maceió.',
  },
  Jacintinho: {
    populacao:
      '73.139 habitantes. Queda de 15,5% em relação a 2010 (quando tinha 86.514 hab.) – perdeu mais de 13 mil moradores, reflexo do esgotamento da área e problemas urbanos.',
    genero:
      'Maioria feminina marcante. Em 2010 havia 4.534 mulheres a mais (diferença de ~5,2%). O Jacintinho sempre apresentou grande contingente de mulheres, mantido em 2022.',
    emprego:
      'Mercado informal e subemprego prevalecem. Como enorme favela/bairro popular central, o Jacintinho concentra muita mão-de-obra, porém com pouca oferta local de empregos formais. Grande parte atua no comércio informal e serviços gerais por toda a cidade. O bairro tornou-se um centro comercial informal por si: ruas cheias de lojas, feiras e serviços funcionando diariamente. Ainda assim, o desemprego e subemprego são altos.',
    faixaEtaria:
      'Jovem. Pela natureza popular e alta natalidade histórica, há muitas crianças e adolescentes. A maioria da população está abaixo dos 40 anos. Entretanto, a densidade extrema e falta de expansão reduziram um pouco os jovens (algumas famílias migraram). Mas ainda é um bairro predominantemente jovem-adulto.',
    renda:
      'Baixa. Jacintinho é um dos bairros de menor renda média, apesar de sua localização central. Em 2010 apresentava indicadores sociais baixos e grande parte das famílias com renda per capita até 1 salário mínimo. Essa situação persiste – mesmo com intensa atividade econômica informal, a riqueza gerada é pouca e mal distribuída.',
    empresas:
      '7.959 empresas ativas – o 5º maior número em Maceió. Isso reflete o comércio vibrante nas ruas do Jacintinho, que se comporta como um “centro comercial” para a população de baixa renda. São em maioria microempresas (lojas, oficinas, mercados) e MEIs. A economia do bairro é principalmente interna e de pequeno porte, porém muito numerosa.',
    perfil:
      'Misto informal (comercial-residencial). Originalmente residencial periférico, o Jacintinho hoje tem predominância comercial no seu núcleo – funciona de domingo a domingo com feiras e lojas populares. Ainda abriga milhares de moradores (em vielas e grotas densas), mas o uso do solo tornou-se bastante comercial e de serviços informais, fazendo dele um bairro econômico importante apesar das condições precárias.',
  },
  Jaraguá: {
    populacao:
      '1.502 habitantes. Encolhimento severo: em 2010 tinha 3.211 hab., já bem menos que no passado. Perdeu mais da metade da população até 2022, devido à conversão completa para zona portuária/comercial.',
    genero:
      'Maioria masculina (provável) ou equilíbrio. Jaraguá historicamente tinha população pequena; com 1,5 mil hab. restando, pode ter leve predominância masculina por conta de alojamentos de trabalhadores portuários. Em 2010 eram 3.211 hab. com maioria feminina (talvez famílias tradicionais). Em 2022 a dinâmica mudou – se considerarmos apenas habitantes remanescentes (alguns em ocupações precárias), pode haver mais homens.',
    emprego:
      'Polo de trabalho, mas poucos moradores empregados locais. Jaraguá é o bairro do porto, do comércio e das sedes corporativas. Abriga muitos empregos formais (indústria, logística, administração) – porém esses trabalhadores não residem majoritariamente no bairro. Os poucos moradores dali, se empregados, atuam no próprio bairro (comércio do porto, serviços) ou são pessoas em situação de rua. A taxa de desemprego residencial é pouco relevante estatisticamente; no contexto urbano, Jaraguá é um centro empregador.',
    faixaEtaria:
      'Adulta. Quase não há crianças ou idosos residindo em Jaraguá. A população fixa remanescente inclui adultos de meia idade, muitos do sexo masculino (trabalhadores informais, moradores de rua). É um bairro que deixou de ter vida residencial familiar.',
    renda:
      'Muito baixa entre residentes. Os moradores que restam em Jaraguá vivem em ocupações ou cortiços de baixíssima renda. Entretanto, o bairro em si movimenta grande capital no comércio e indústria (PIB local alto devido ao porto). Essa contradição faz com que a renda média dos residentes seja baixa, embora seja um bairro “rico” em termos de economia urbana.',
    empresas:
      'Não se aplica aos residentes. Jaraguá possui dezenas de grandes empresas e órgãos (porto de Maceió, indústrias, alfândega, museus, etc.). Como unidade territorial empresarial, abriga muitas empresas – porém o dado de empresas ativas se dilui porque quase não há população residente.',
    perfil:
      'Comercial/Industrial (não residencial). Jaraguá outrora foi bairro residencial e boêmio; hoje é quase inteiramente zona comercial, portuária e institucional. Possui armazéns, o porto, museus, centros culturais, escritórios e alguns bares. A função residencial é mínima – o bairro “fecha” à noite, restando poucas habitações ocupadas. É um centro histórico e econômico, mas não mais um bairro habitacional.',
  },
  'Jardim Petrópolis': {
    populacao:
      '5.011 habitantes. Praticamente estagnada em relação a 2010 (5.081 hab.), mantendo caráter de bairro pequeno de classe média.',
    genero:
      'Maioria feminina leve. Em 2010 eram ~51% mulheres. A população atual mantém um discreto predomínio de mulheres, semelhante ao observado em Maceió como um todo.',
    emprego:
      'Baixa disponibilidade local. Jardim Petrópolis é estritamente residencial, sem centros comerciais grandes. A maioria absoluta dos moradores trabalha fora (Centro, Farol, etc.). Portanto, o bairro em si não gera empregos significativos – seus moradores, de classe média, tendem a ter empregos formais e acesso a oportunidades, resultando em baixo desemprego entre os residentes.',
    faixaEtaria:
      'Adultos e crianças. Bairro tipicamente familiar, com muitas casas, o Jardim Petrópolis possui bastante crianças/adolescentes e seus pais (30–50 anos). Há também idosos morando com famílias. No geral, a estrutura etária é equilibrada entre jovens e adultos, refletindo um bairro residencial estável.',
    renda:
      'Média. Trata-se de um enclave de classe média (e média-alta em algumas ruas) na parte alta da cidade. A renda média domiciliar está acima da média municipal. Em 2010, o bairro apresentava bons indicadores de educação e renda, situando-se entre os mais favorecidos fora da orla.',
    empresas:
      '441 empresas ativas – número muito baixo, confirmando o perfil estritamente residencial (está entre os 10 bairros com menos empresas). Existem apenas comércio de conveniência (padarias, farmácias) e serviços pessoais dentro do bairro. A maior parte das atividades econômicas dos moradores acontece fora dali.',
    perfil:
      'Residencial unifamiliar. Jardim Petrópolis é formado principalmente por loteamentos de casas de médio/alto padrão em ruas arborizadas. Não há áreas industriais ou comerciais importantes. O ambiente é de bairro-dormitório tranquilo de classe média, com pouquíssima movimentação comercial interna.',
  },
  Jatiúca: {
    populacao:
      '42.466 habitantes. Continuou crescendo (+11,7% sobre 2010) apesar de já adensada, consolidando-se como importante bairro urbano e turístico.',
    genero:
      'Maioria feminina marcante. Jatiúca possuía cerca de 4.749 mulheres a mais que homens em 2010 – uma das maiores diferenças proporcionais (+≈14% mulheres). Em 2022 essa característica persiste: muitas mulheres residentes (algumas vivendo sozinhas ou chefes de família).',
    emprego:
      'Diversificado e ativo. Jatiúca é um dos polos econômicos de Maceió: concentra hotéis, restaurantes, shopping, escolas e escritórios. Há muitos empregos formais disponíveis localmente, especialmente em turismo, comércio e serviços. Isso faz com que os moradores tenham facilidade de inserção no mercado de trabalho (no próprio bairro ou arredores). A taxa de desemprego entre residentes tende a ser baixa, comparativamente.',
    faixaEtaria:
      'Adultos (com presença jovem). O bairro é urbano e verticalizado, com muitos apartamentos habitados por adultos de 25–59 anos (profissionais, famílias pequenas). Há também população jovem significativa atraída pela vida noturna e proximidade de faculdades, além de alguns idosos em edifícios antigos. Mas no conjunto, adultos em idade produtiva dominam a demografia.',
    renda:
      'Alta. Jatiúca está entre os bairros de maior renda de Maceió (abaixo apenas de Ponta Verde possivelmente). Em 2010 já apresentava renda per capita elevada. Com a valorização imobiliária e oferta de serviços premium, a renda média dos moradores é alta – classe média alta e muitos profissionais liberais, embora também haja residentes de renda média em partes menos nobres.',
    empresas:
      '9.452 empresas ativas – o 3º maior quantitativo da cidade. Jatiúca é um forte centro comercial e de lazer, contendo shoppings, hotéis, bares, restaurantes, clínicas e escritórios. A economia do bairro é bastante dinâmica, tanto para o público local quanto turístico, o que explica o grande número de empreendimentos registrados.',
    perfil:
      'Misto (turístico-residencial). Jatiúca combina balneário turístico (orla com hotéis, bares e vida noturna vibrante) com zona residencial vertical de alto padrão logo atrás. É um bairro 24 horas, onde moradia e comércio convivem intensamente. Podemos defini-lo como um bairro residencial de classe alta e, simultaneamente, centro gastronômico/hoteleiro, ou seja, nitidamente misto em usos.',
  },
  Levada: {
    populacao:
      '9.554 habitantes. Apresentou leve declínio (era 10.882 hab. em 2010), permanecendo um bairro populoso tradicional na região central baixa.',
    genero:
      'Maioria feminina. Em 2010 as mulheres representavam cerca de 50,9%. Continua havendo ligeiro predomínio de mulheres, alinhado ao padrão geral de Maceió.',
    emprego:
      'Área comercial popular. A Levada abriga o Mercado da Produção e comércio atacadista tradicional, o que gera empregos informais e formais (feirantes, carregadores, lojistas). Muitos moradores trabalham nessas atividades locais ou em serviços no Centro adjacente. O desemprego não é tão crítico quanto em bairros periféricos, pois a proximidade do centro oferece opções de renda (ainda que informais). Ainda assim, há bolsões de pobreza e alguns moradores desempregados.',
    faixaEtaria:
      'Adultos e jovens. A Levada é um bairro urbano antigo, com famílias estabelecidas. A maioria dos moradores está na faixa 20–50 anos, mas há também muitas crianças em cortiços e vielas (por ser um bairro de renda baixa). A presença de idosos é menor.',
    renda:
      'Baixa. É um bairro historicamente de baixa renda – muitos moradores vivem de pequenos comércios ou trabalhos braçais no mercado. Em 2010, figurava entre as áreas centrais de menor renda. Ainda hoje, a renda domiciliar média é baixa, apesar de haver movimento econômico intenso no comércio local (a riqueza gerada não se traduz em altos rendimentos para os moradores).',
    empresas:
      'Não muito elevado. Embora a Levada seja um importante centro de comércio atacadista (frutas, verduras, estivas), muitas atividades são informais. O número de empresas registradas formalmente não é dos maiores. Estima-se em torno de algumas centenas a mil empresas ativas. A Levada não aparece entre os top 10, indicando que grande parte de sua economia opera à margem da formalidade.',
    perfil:
      'Comercial popular e residencial precário. A Levada mescla mercados públicos, armazéns e feiras com moradias simples (cortiços, palafitas próximas à lagoa). É um bairro de perfil comercial informal fortíssimo durante o dia e residência de classes baixa. Em suma, funciona como um entreposto comercial central onde também moram pessoas de baixa renda em condições precárias.',
  },
  Mangabeiras: {
    populacao:
      '4.554 habitantes. Crescimento pequeno desde 2010 (4.166 hab.), mantendo-se pouco populosa devido ao seu caráter institucional.',
    genero:
      'Maioria feminina leve. Em 2010 mulheres eram ~50,7%. A população permanece praticamente equilibrada, com pequena maioria de mulheres.',
    emprego:
      'Polo institucional de serviços. Mangabeiras abriga grandes equipamentos (Shopping Maceió, Parque Shopping – embora já em Cruz das Almas –, Justiça Federal, academias) que geram empregos, mas poucos residem no bairro. Os moradores que há pertencem a condomínios fechados de alto padrão. Portanto, entre residentes, o desemprego é baixo (são pessoas de alta renda, muitas aposentadas ou empresários). No contexto do bairro como zona funcional, ele atrai muitos trabalhadores de fora.',
    faixaEtaria:
      'Adultos de alta renda. A população residencial é composta em grande parte por adultos e idosos de classe alta vivendo em condomínios horizontais (como Aldebaran). Poucas crianças e jovens moram no bairro, pois não é um bairro convencional – grande parte é ocupada por áreas comerciais ou de reserva. Assim, a estrutura etária dos moradores tende mais a faixa madura.',
    renda:
      'Muito alta. Mangabeiras é um dos logradouros de maior renda: abrange condomínios de luxo e áreas nobres. A renda per capita dos residentes está entre as maiores de Maceió, comparável à Ponta Verde. Entretanto, a maior parte do território não é residencial, então esse dado afeta relativamente poucas pessoas.',
    empresas:
      '~2.350 empresas ativas (aprox.). Se considerarmos os dois shoppings (um no limite), além de concessionárias, grandes supermercados e sedes institucionais, o número de estabelecimentos é significativo. Mangabeiras é um centro comercial/serviços importante. Não figura entre os top 5 por ter área territorial pequena, mas a densidade de empresas por habitante é altíssima.',
    perfil:
      'Institucional/Comercial e residencial de luxo. Mangabeiras tem dupla face: por um lado, grandes empreendimentos comerciais (shoppings, hipermercados, órgãos públicos) e parques; por outro, bolsões residenciais fechados de alto padrão. Não possui um tecido urbano típico – é um bairro de avenidas amplas e condomínios. Em resumo, mais centro de compras/lazer do que bairro residencial convencional, embora abrigue a elite nos condomínios.',
  },
  Mutange: {
    populacao:
      '0 habitantes. (Área evacuada). O Mutange deixou de ser habitado após 2019 devido ao desastre do afundamento do solo causado pela mineração da Braskem. Em 2010 tinha 2.632 hab.; em 2022 oficialmente consta zero.',
    genero:
      'N/A. Com a evacuação total, não há população para compor estatística de gênero. Em 2010, antes do desastre, a distribuição era equilibrada (aprox. 1.248 homens, 1.384 mulheres).',
    emprego:
      'N/A. Não há força de trabalho residente. Historicamente, Mutange era um pequeno bairro operário; o fim do bairro eliminou quaisquer atividades econômicas locais.',
    faixaEtaria:
      'N/A. (Bairro inabitado.) Anteriormente tinha perfil de comunidade tradicional com adultos e crianças, mas essas famílias foram reassentadas.',
    renda: 'N/A. Antes era um dos bairros mais pobres; atualmente, sem moradores, não se aplica.',
    empresas:
      '87 empresas ativas (2019) antes do fechamento – agora praticamente 0 funcionando. Todo comércio e serviços do Mutange cessaram com a desocupação (restam apenas estruturas abandonadas).',
    perfil:
      '(Bairro extinto). Mutange oficialmente ainda existe como bairro geográfico, mas é uma zona desocupada e isolada, sem uso residencial ou comercial. Seu território sofre monitoramento ambiental; não possui mais uma comunidade ativa.',
  },
  'Ouro Preto': {
    populacao:
      '6.247 habitantes. Estabilizou-se em relação a 2010 (6.224 hab.), apesar de estar na área de influência do desastre geológico (foi menos afetado que Pinheiro/Bebedouro).',
    genero:
      'Maioria feminina discreta. Em 2010 mulheres eram ~52%. Permanece leve predominância de mulheres sobre homens na população.',
    emprego:
      'Em alerta devido ao afundamento. Ouro Preto é um bairro popular adjacente às áreas afetadas pela mineração. Embora não evacuado totalmente, a incerteza prejudicou a economia local – comércios fecharam e imóveis desvalorizaram. Os moradores que ficaram enfrentam dificuldades; muitos empregos informais se perderam. Assim, o desemprego/subemprego provavelmente cresceu. Antes, os moradores trabalhavam em oficinas, comércio local ou no Centro (próximo); agora a situação é frágil.',
    faixaEtaria:
      'Adultos jovens. Ouro Preto abrigava principalmente famílias de trabalhadores, com muitos em idade ativa e seus filhos. Ainda há presença significativa de crianças, mas a faixa de 20–50 anos domina. Alguns idosos se mudaram por segurança, o que manteve a população relativamente mais jovem dentre os que restam.',
    renda:
      'Baixa. Era um bairro de classe trabalhadora de baixa renda e assim permanece, possivelmente até mais empobrecido após os problemas geológicos. Grande parte das famílias tem renda modesta, dependendo de empregos de baixa qualificação.',
    empresas:
      'Poucas. Ouro Preto nunca teve grande comércio; era mais residencial. Após 2018, diversos estabelecimentos fecharam. Estima-se atualmente um número reduzido de empresas ativas (talvez em torno de 100–200). O bairro não é citado nos rankings de empresas, indicando atividade empresarial limitada.',
    perfil:
      'Residencial popular, impactado por desastre. Ouro Preto é essencialmente residencial, com casas simples e alguns prédios baixos, e poucos comércios de bairro. Depois do surgimento das rachaduras e do pânico acerca do solo, o bairro ficou estigmatizado e semi-paralisado em investimentos. Ainda é um local de moradia de baixa renda, porém sob constante ameaça e sem novas dinâmicas econômicas.',
  },
  Pajuçara: {
    populacao:
      '3.542 habitantes. Leve declínio frente a 2010 (3.711 hab.), pois muitos imóveis residenciais viraram comerciais (hotéis, flats).',
    genero:
      'Maioria feminina. Em 2010 mulheres eram ~53%. A Pajuçara segue a tendência dos bairros urbanos com mais mulheres, possivelmente intensificado pelo fato de muitas moradoras sozinhas (viúvas, etc.) permanecerem enquanto famílias se mudam.',
    emprego:
      'Forte setor de turismo e serviços. A Pajuçara é um dos principais cartões-postais de Maceió, repleta de hotéis, restaurantes, feirinha de artesanato – ou seja, muitos empregos formais e informais no turismo. O bairro em si emprega bastante gente (a maioria vinda de fora morar), e os residentes têm fácil acesso a empregos locais (por exemplo, alguns proprietários de pousadas, artesãos). Assim, entre quem mora na Pajuçara, o desemprego é baixo.',
    faixaEtaria:
      'Adultos e idosos. Como área nobre de veraneio, muitas unidades residenciais são ocupadas por idosos ou casais sem filhos. Há menos crianças morando no bairro (familias jovens preferem bairros mais extensos). A maioria dos moradores fixos está na faixa 30–70 anos. Parte significativa são aposentados que optaram por viver à beira-mar.',
    renda:
      'Alta. Pajuçara está no topo da pirâmide de renda de Maceió, ao lado de Ponta Verde e Jatiúca. Em 2010 já figurava entre as rendas per capita mais elevadas. O custo de vida alto e o perfil turístico filtram quem reside ali, majoritariamente classes média-alta e alta.',
    empresas:
      'Não divulgado precisamente, mas certamente centenas de empresas (hotéis, restaurantes, lojas) operam no bairro. A Pajuçara é um dos eixos econômicos do turismo alagoano, embora o número absoluto de empresas possa ser menor que Jatiúca devido à área menor. De todo modo, concentra grande quantidade de CNPJs no ramo de hospedagem, alimentação e comércio artesanal.',
    perfil:
      'Misto turístico-residencial. A Pajuçara combina luxo residencial (apartamentos de alto padrão com vista mar) com vocação turística intensa (orla repleta de hotéis e atrações). Durante o dia é movimentada por turistas; à noite, os moradores usufruem do calçadão. Trata-se de um bairro residencial nobre, porém intrinsecamente atrelado ao comércio turístico.',
  },
  Pescaria: {
    populacao:
      '2.579 habitantes. Pequeno aumento em relação a 2010 (2.784 hab.), indicando leve êxodo ou estabilização numa comunidade litorânea afastada.',
    genero:
      'Maioria masculina (exceção). A Pescaria foi o único bairro de Maceió que tinha mais homens que mulheres – em 2010 havia 40 homens a mais. Essa diferença tende a persistir, pois é uma vila de pescadores onde tradicionalmente a população masculina é ligeiramente maior.',
    emprego:
      'Economia de subsistência. Como o nome sugere, a pesca artesanal é a base econômica. Empregos formais quase inexistem – alguns moradores podem trabalhar em resorts próximos ou em propriedades rurais. A maioria vive da pesca, maricultura e do modesto turismo local (passeios). O desemprego formal é alto, mas a comunidade sobrevive da atividade pesqueira.',
    faixaEtaria:
      'Adultos jovens. A vila tem muitas famílias pescadoras, com pais jovens e vários filhos. Portanto, crianças e adolescentes são numerosos, mas a maior faixa ainda é de adultos de 20–45 anos que trabalham no mar. É um local de população relativamente jovem comparado à cidade em geral.',
    renda:
      'Baixa. Pescaria está entre os menores níveis de renda. A maioria das famílias vive com rendimentos instáveis da pesca, o que resulta em renda per capita bastante baixa. Em 2010, era zona de extrema pobreza significativa. Essa condição não mudou substancialmente.',
    empresas:
      '233 empresas ativas – dentre os menores quantitativos. O pouco que há de formalidade são pequenos bares, mercadinhos e possivelmente alguns empreendimentos turísticos (pousadas rústicas). É basicamente uma economia informal e familiar.',
    perfil:
      'Rural-pesqueiro. Pescaria mantém as características de povoado de pescadores, com casario simples e forte dependência do meio ambiente (rio, marisco). Apesar de fazer parte de Maceió, é um bairro isolado, de perfil rural e litorâneo, onde a modernização urbana praticamente não chegou.',
  },
  Petrópolis: {
    populacao:
      '26.273 habitantes. Aumentou de forma significativa (+11% sobre 2010) e é hoje um dos bairros mais populosos da parte alta.',
    genero:
      'Maioria feminina leve. Em 2010 mulheres eram cerca de 50,8%. A população mantém uma distribuição equilibrada, com pequena vantagem para mulheres.',
    emprego:
      'Bairro-dormitório com comércio local. Petrópolis (também chamado “Complexo do Benedito Bentes II” informalmente) tem características similares a Benedito Bentes: grande população, mas a maioria trabalha fora ou em pequenos negócios locais. O desemprego é um desafio, sobretudo para os jovens – tende a ser alto, acima da média urbana, em razão da falta de indústrias e do perfil socioeconômico (barracos e loteamentos de baixa renda).',
    faixaEtaria:
      'Jovem. O bairro é relativamente novo e populoso, com muitas crianças e adolescentes. A faixa etária predominante vai dos 0 aos 39 anos. Há enorme contingente de jovens – a estrutura etária é de pirâmide populacional larga na base, típica de áreas periféricas com alta natalidade.',
    renda:
      'Baixa. Petrópolis é um bairro de origem em ocupações e loteamentos populares, apresentando renda domiciliar baixa. Em comparativo municipal, situa-se entre os bairros de menor poder aquisitivo. Muito de sua população depende de programas sociais e empregos informais.',
    empresas:
      'Poucas formalizadas. Embora densamente habitado, o bairro não se destaca em número de empresas. Estima-se alguns poucos centenas de negócios, em sua maioria microempreendedores individuais atendendo à comunidade (mercados, confecções, serviços). A maioria das atividades econômicas do bairro é informal ou de pequena escala.',
    perfil:
      'Residencial periférico. Petrópolis é essencialmente residencial, com grandes conjuntos habitacionais e grotas ocupadas. Possui comércio de bairro básico, mas nenhum polo econômico. É um bairro dormitório de baixa renda, marcado por habitação popular e carência de infraestrutura urbana.',
  },
  Pinheiro: {
    populacao:
      '5.369 habitantes. Redução drástica – em 2010 eram 19.062 hab.; perdeu ~13,7 mil moradores (-72%) devido às rachaduras de solo que afetaram profundamente o bairro.',
    genero:
      'Indefinido após êxodo. Em 2010 havia equilíbrio (cerca de 51% mulheres). Com a evacuação de grande parte dos moradores (bairros do “Mapa da Mina”), a composição de gênero atual é incerta. Provavelmente restaram proporções similares ou um leve predomínio feminino dentre os poucos que ficaram.',
    emprego:
      'Colapso local. Pinheiro era um bairro de classe média com comércio ativo (padarias, escolas, clínicas). O desastre geológico fechou inúmeras empresas e expulsou moradores, esvaziando a economia local. Consequentemente, empregos locais foram perdidos. Os residentes que permaneceram possivelmente estão desempregados ou se deslocaram para trabalhar fora, já que o bairro deixou de oferecer oportunidades.',
    faixaEtaria:
      'N/A. Antes da crise, a população era majoritariamente adulta de classe média. Hoje, com apenas ~5 mil habitantes espalhados e muitos imóveis vazios, não se pode definir uma faixa predominante relevante – o bairro está “fragmentado” demograficamente.',
    renda:
      'Média (dentre remanescentes). Pinheiro foi um bairro tradicional de classe média alta. Os que saíram incluíram muitas famílias de maior renda. Os que ficaram podem ser tanto remanescentes de menor renda (que não tinham para onde ir) quanto alguns poucos estabelecimentos. O bairro já teve renda média alta; atualmente não há dado claro, mas presumivelmente caiu a renda global pelo abandono imobiliário.',
    empresas:
      'Quase inexistentes. Antes, Pinheiro abrigava centenas de negócios; após 2018, a maioria fechou ou mudou-se. Hoje há pouquíssimas empresas funcionando (talvez alguma farmácia ou mercado em área não afetada). No auge, tinha milhares de empresas – agora, praticamente nenhum movimento comercial.',
    perfil:
      'Bairro evacuado/desativado. Pinheiro era misto residencial-comercial de classe média; após o afundamento do solo, tornou-se um bairro fantasma em grande parte, com quarteirões inteiros interditados. O perfil atual é de um bairro em ruínas, aguardando medidas de reurbanização futura.',
  },
  Pitanguinha: {
    populacao:
      '4.261 habitantes. Leve declínio desde 2010 (4.789 hab.), mantendo-se um bairro pequeno e estável.',
    genero:
      'Maioria feminina leve. Em 2010 as mulheres eram cerca de 52%. Hoje continua havendo ligeira maioria de mulheres entre os moradores, similar ao padrão urbano.',
    emprego:
      'Residencial com poucas oportunidades locais. Pitanguinha é um bairro de classe média, majoritariamente residencial (casas e condomínios). Possui poucas empresas – logo, os moradores trabalham em outros locais (Centro, Farol, etc.). A taxa de desemprego entre os residentes tende a ser baixa, pois trata-se de população de nível socioeconômico médio, com boa escolaridade. No próprio bairro, não havendo mercado de trabalho significativo, não há geração interna de empregos.',
    faixaEtaria:
      'Adultos e idosos. A Pitanguinha é um bairro antigo e tranquilo, atraente para famílias e aposentados. Muitos moradores têm mais de 50 anos. Ainda existem famílias jovens, mas o ritmo do bairro é mais calmo e envelhecido em relação à média. Assim, adultos de meia-idade e idosos compõem uma parcela notável, embora a maioria seja adulta em geral.',
    renda:
      'Média. Considerando as casas e condomínios de padrão médio e alguns de alto padrão, a renda do bairro está em torno ou ligeiramente acima da média de Maceió. Não é dos mais ricos, mas também não possui bolsões de pobreza. Em 2010 apresentava IDH bom, reflexo de renda e educação satisfatórias.',
    empresas:
      '~4.261 habitantes e proporcionalmente poucas empresas. Não há dados exatos, mas provavelmente menos de 200 empresas ativas (comércio restrito a padarias, farmácias e pequenas lojas). Pitanguinha não é um polo comercial – os moradores consomem em bairros vizinhos.',
    perfil:
      'Residencial tranquilo. O bairro caracteriza-se por ruas arborizadas e condomínios fechados, com atmosfera pacata. É predominantemente residencial, abrigando parte da classe média maceioense, e tem pouca atividade comercial dentro de seus limites (apenas estabelecimentos básicos). É, em essência, um bairro-dormitório de bom padrão.',
  },
  Poço: {
    populacao:
      '19.504 habitantes. Queda moderada frente a 2010 (20.776 hab.), possivelmente pela conversão de imóveis residenciais em comerciais/hoteleiros.',
    genero:
      'Maioria feminina significativa. Em 2010, o Poço contava com cerca de 8% mais mulheres. Permanece uma diferença notável – é um bairro com várias instituições de saúde e abrigos, atraindo mais mulheres idosas; além disso, muitas moradoras vivem em apartamentos sozinhas.',
    emprego:
      'Vocação em serviços. O Poço tem muitos hospitais, clínicas e hotéis. Isso gera empregos formais na área da saúde e turismo. Muitos moradores também trabalham nessas instituições ou no centro da cidade (próximo). Assim, a taxa de desemprego local é baixa – é um bairro central com população de nível socioeconômico melhor e amplas oportunidades nas redondezas.',
    faixaEtaria:
      'Adultos e idosos. O bairro mistura prédios residenciais antigos e instituições. Há muitos idosos residentes (o Poço tem casas de repouso e é preferido por aposentados), e adultos de meia idade. Existem poucas crianças em comparação – não é um bairro de perfil jovem, mas sim maduro/envelhecendo.',
    renda:
      'Alta/Média-alta. O Poço situa-se em área nobre próxima à orla da Pajuçara. Tem condomínios de bom padrão e moradores de classe média alta. Em 2010 apresentava renda per capita elevada (dentro do top 5 da cidade em alguns indicadores). Portanto, a renda média é alta, embora haja diversificação (também residem algumas famílias de renda média e estudantes em quitinetes).',
    empresas:
      '21.185 empresas ativas (dado de 2010). O Poço abriga um grande número de estabelecimentos de saúde (hospitais, clínicas, laboratórios), hotéis, restaurantes e escolas (Colégio Marista, SENAC). Em 2024, estima-se que o bairro tenha em torno de 3 mil empresas (considerando crescimento e formalizações), não figurando entre os top 10, mas com relevância setorial na saúde.',
    perfil:
      'Misto institucional-residencial. O Poço é um bairro residencial de classe média alta, mas marcado fortemente por instituições: hospitais (Santa Casa, Hospital do Açúcar), escolas tradicionais e hotéis. Tem ruas tranquilas de casas e edifícios residenciais, intercaladas com grandes quarteirões institucionais. Funciona tanto como local de moradia privilegiado quanto como polo de serviços de saúde e educação da capital.',
  },
  'Ponta da Terra': {
    populacao:
      '7.167 habitantes. Diminuiu em relação a 2010 (8.403 hab.), possivelmente pelo adensamento turístico nos arredores (parte da população local foi deslocada por empreendimentos).',
    genero:
      'Maioria feminina leve. Em 2010 mulheres representavam ~50,7%. Permanece um bairro com proporção de mulheres um pouco maior que de homens.',
    emprego:
      'Ligado à pesca e serviços. Ponta da Terra, embora colado à Pajuçara, ainda mantém uma colônia de pescadores. Muitos moradores vivem da pesca artesanal e do turismo (passeios às piscinas naturais, barracas de praia). Parte também trabalha em hotéis e restaurantes vizinhos. O desemprego formal não é tão baixo quanto na Pajuçara, pois a comunidade tradicional enfrenta dificuldades – mas o turismo oferece ocupações informais. Deve estar próximo da média.',
    faixaEtaria:
      'Adultos jovens. Há muitas famílias de pescadores e trabalhadores, com filhos adolescentes. A maioria está na faixa 20–50 anos, sustentando famílias. Existem idosos (pescadores aposentados) em quantidade significativa também, mantendo viva a tradição.',
    renda:
      'Média-baixa. Apesar da localização central, a Ponta da Terra tem bolsões de moradia simples e vila de pescadores, resultando em renda média inferior à dos bairros turísticos vizinhos. A introdução de alguns edifícios residenciais de classe média elevou um pouco a renda em certos trechos, mas a comunidade original ainda tem renda modesta.',
    empresas:
      'Poucas e focadas no turismo. O bairro tem algumas pousadas, bares e empresas ligadas a passeios náuticos, mas não muitos estabelecimentos formais além disso. Provavelmente conta com algumas centenas de empresas registradas (não figura entre os principais). O grosso da atividade econômica se dá de forma informal (pescadores, artesãos, aluguel de equipamentos de praia).',
    perfil:
      'Residencial tradicional com atividade pesqueira/turística. A Ponta da Terra combina duas facetas: vila de pescadores (nas ruas internas, com igreja, casas simples) e faixa turística gradualmente se desenvolvendo próximo à orla da Pajuçara. Ainda é majoritariamente residencial popular, com forte identidade cultural ligada à pesca e ao mar, mas sob influência crescente do turismo urbano.',
  },
  'Ponta Grossa': {
    populacao:
      '18.381 habitantes. Caiu em relação a 2010 (21.796 hab.), seguindo tendência de esvaziamento de alguns bairros centrais antigos.',
    genero:
      'Maioria feminina. Em 2010 mulheres eram cerca de 53% da população. Mantém-se essa predominância – a Ponta Grossa é um dos bairros onde a diferença de gênero era grande (2010: menos 2.390 homens que mulheres), possivelmente por migração masculina.',
    emprego:
      'Bairro popular com comércio local. Ponta Grossa é tradicional e conta com pequenos comércios, oficinas e proximidade do Polo Multifabril do Tabuleiro (antigo DIP). Ainda assim, muitos moradores precisam buscar trabalho fora. O desemprego atinge sobretudo jovens e menos escolarizados – pode ser maior que a média. Porém, a localização relativamente central facilita encontrar empregos no Distrito Industrial ou no comércio do centro, atenuando um pouco a desocupação.',
    faixaEtaria:
      'Adultos Jovens. Bairro de origem operária, tem muitas famílias com filhos. A maioria da população está na faixa 15–49 anos. Há presença de crianças e adolescentes em quantidade, mas também muitos adultos jovens tocando pequenos negócios. A população idosa não é tão numerosa.',
    renda:
      'Baixa-média. Ponta Grossa teve auge industrial no passado, mas atualmente é de renda modesta, embora não tão baixa quanto grotas periféricas. Em 2010 apresentava renda um pouco abaixo da média de Maceió. Hoje, a renda domiciliar média continua baixa, mas há uma base de classe média baixa estabelecida (com pequenos empresários locais).',
    empresas:
      '1.920 empresas ativas (aprox.). O bairro tem um comércio tradicional forte (Rua da Ponta Grossa, mercados, oficinas mecânicas) e muita atividade informal. Embora não seja destaque na quantidade formal, abriga diversos microempreendimentos locais. Possui também indústrias remanescentes próximas (fábrica de óleo, etc.).',
    perfil:
      'Misto popular. Ponta Grossa é residencial em essência, mas com vocações comerciais e industriais remanescentes. Tem ruas com casas e edifícios antigos onde vivem famílias e, ao mesmo tempo, é cortada por avenidas cheias de lojas, e fábricas próximas ao porto. É um bairro urbano tradicional, de população trabalhadora e vida comercial própria, embora não tão sofisticado.',
  },
  'Ponta Verde': {
    populacao:
      '28.591 habitantes. Cresceu cerca de +17% desde 2010, consolidando-se como bairro nobre altamente adensado verticalmente.',
    genero:
      'Maioria feminina acentuada. Ponta Verde lidera em diferença proporcional – em 2010 eram 13% mais mulheres que homens, a maior diferença na cidade. Em 2022, continua com predominância de mulheres (muitas moradoras solteiras ou viúvas em apartamentos de luxo).',
    emprego:
      'Centro de serviços upscale. O bairro abriga restaurantes, clínicas, escritórios e comércio de alto padrão, gerando empregos qualificados. Contudo, a maioria dos moradores é de classe alta – empresários, profissionais – com baixo nível de desemprego. Muitos inclusive empregam terceiros (empregadas domésticas, etc.). A taxa de desocupação residente é muito baixa; a Ponta Verde concentra alguns dos mais altos índices de emprego formal e renda.',
    faixaEtaria:
      'Adultos e idosos. Por ser bairro caro, muitas famílias já estabelecidas e idosos abastados residem ali. Há relativamente poucas crianças. A faixa predominante vai dos 35 aos 75 anos. É comum apartamentos habitados por casais idosos ou adultos de meia-idade; jovens adultos também estão presentes (filhos de famílias tradicionais), mas proporcionalmente o bairro tende a envelhecer.',
    renda:
      'Altíssima. Ponta Verde está entre os bairros de maior renda do Nordeste. Em 2010 sua renda per capita (~R$4.432 mensais) era cerca de 8,5 vezes a do Benedito Bentes. É o bairro mais rico de Maceió, com imóveis caros e moradores de elite (empresários, altos funcionários). A renda média permanece excepcionalmente elevada em 2022.',
    empresas:
      '4.609 empresas ativas, figurando entre os 10 maiores polos. Ponta Verde concentra empresas de serviços sofisticados – clínicas médicas, escritórios de advocacia, lojas de grife – além de bares e restaurantes badalados. Muitos negócios têm endereço na Ponta Verde justamente pelo público de alto poder aquisitivo do entorno.',
    perfil:
      'Residencial nobre e comercial de luxo. A Ponta Verde é essencialmente um bairro residencial de classe alta, com edifícios modernos e alta densidade. Simultaneamente, possui forte componente comercial voltado para classe alta e turistas (gastronomia, boutiques, clínicas). É um bairro misto de alto padrão, onde morar, trabalhar e lazer de luxo se combinam em um dos espaços mais valorizados da cidade.',
  },
  'Pontal da Barra': {
    populacao:
      '3.343 habitantes. Crescimento modesto (+35% desde 2010, que tinha 2.478 hab.), mantendo perfil de vila pesqueira urbana.',
    genero:
      'Maioria feminina leve. Em 2010 mulheres eram ~50,1%. Atualmente, com ~3,3 mil pessoas, deve haver pequena maioria de mulheres (o bairro atrai artesãs rendeiras, tradicionalmente mulheres).',
    emprego:
      'Artesanato e pesca como sustento. O Pontal é conhecido pela comunidade de rendeiras (labirinteiras) e pescadores. Grande parte da renda vem da produção artesanal de renda e do pescado, atividades familiares. Empregos formais são raros (alguns em restaurantes de frutos do mar locais). O desemprego formal pode ser alto, mas muitas mulheres empreendem no artesanato. Com o turismo crescente (restaurantes de lagosta famosos), surgiram algumas vagas informais. Ainda assim, a economia é frágil e o subemprego comum.',
    faixaEtaria:
      'Adultos e jovens. Bairro tradicional, famílias grandes – muitos jovens e crianças participam do ofício do artesanato. Predominam adultos de 20–50 anos ativos nas atividades manuais e pesca. Há forte presença de mulheres de meia idade (as rendeiras). Idosos existem, mas o bairro se renova com gerações mantendo as tradições.',
    renda:
      'Baixa. Apesar do talento artesanal reconhecido, as rendeiras e pescadores não obtêm grande retorno financeiro. A renda média no Pontal da Barra é baixa, semelhante a de bairros periféricos rurais. Muitos complementam rendimentos com turismo, mas não o suficiente para elevar substancialmente o padrão de vida. O bairro carece de infraestrutura, refletindo essa renda limitada.',
    empresas:
      '365 empresas ativas – entre as menores contagens. Essencialmente correspondem a ateliês de renda (muitos MEIs), pequenas peixarias, restaurantes de frutos do mar e lojinhas de artesanato. A atividade econômica é quase toda familiar e direcionada ao turismo que visita o bairro para comprar rendas e comer pescado.',
    perfil:
      'Tradicional/cultural. O Pontal da Barra é um bairro residencial e artesanal, com forte identidade cultural (renda filé, pesca lagunar). É basicamente uma vila dentro da cidade, onde a vida gira em torno da lagoa Mundaú e do artesanato local. O perfil é residencial simples, com economia criativa local – um destino turístico cultural, mas que não alterou o modo de vida modesto dos moradores.',
  },
  Prado: {
    populacao:
      '14.884 habitantes. Redução em comparação a 2010 (17.763 hab.), reflexo da migração de moradores para áreas mais novas e do avanço comercial.',
    genero:
      'Maioria feminina. Em 2010 mulheres eram ~50,8%. Mantém ligeira maioria de mulheres entre os residentes, tendência similar aos demais bairros centrais.',
    emprego:
      'Comércio atacadista e serviços públicos. O Prado é próximo ao porto e concentra depósitos, oficinas e órgãos (Secretaria de Segurança, Detran). Isso gera empregos locais (motoristas, lojistas, funcionários públicos). Muitos moradores do Prado trabalham nessas atividades ou no centro. O desemprego entre residentes é moderado – há oportunidades na região, mas a qualificação da mão-de-obra local às vezes não atende, resultando em algum desemprego estrutural. Em geral, dada a localização central, a maioria consegue ocupação formal ou informal nas imediações.',
    faixaEtaria:
      'Adultos. O Prado é um bairro antigo, com população envelhecendo. Muitas famílias tradicionais ainda residem lá, então há boa quantidade de idosos. Porém, a maior parcela é de adultos de meia idade. O número de crianças diminuiu à medida que o bairro se verticalizou e perdeu moradores para bairros mais novos.',
    renda:
      'Média-baixa. Embora central, o Prado tem perfil socioeconômico de classe média baixa. Em 2010 apresentava indicadores medianos. Há ruas com casas antigas de classe média tradicional e outras com habitação popular. No geral, a renda per capita fica ligeiramente abaixo da média da cidade, com desigualdade interna (comerciantes mais prósperos vs. famílias operárias).',
    empresas:
      'Não muito elevado. O Prado possui muitos depósitos, oficinas mecânicas, lojas de autopeças e um comércio especializado, mas boa parte das empresas pode estar registradas oficialmente em Jaraguá/Centro. Ainda assim, estima-se um número considerável de empresas (talvez em torno de 1.000). Não aparece entre os 10 primeiros, mas é um bairro economicamente ativo durante o dia devido ao comércio de materiais de construção, peças e serviços automotivos.',
    perfil:
      'Misto tradicional. O Prado combina residências antigas (prédios e casas dos anos 70) com forte presença de estabelecimentos comerciais e depósitos nas vias principais. É um bairro de transição entre o residencial central e a zona portuária. Tem vida própria com lojas e também é dormitório de muitas famílias há décadas. Nos últimos anos viu um esvaziamento residencial parcial em prol de usos comerciais, mas ainda mantém população significativa.',
  },
  'Riacho Doce': {
    populacao: '5.833 habitantes. Aumentou cerca de +12% desde 2010 (5.218 hab.), mantendo-se pequeno.',
    genero: 'Maioria feminina leve. Em 2010 mulheres ~51%. Continua com discreta maioria de mulheres, comum em comunidades tradicionais.',
    emprego:
      'Comunidade pesqueira/turística modesta. Riacho Doce é vila litorânea conhecida pela cocada (doce típico). Os empregos formais são raros – muitos vivem de pesca, artesanato (cocadas para turistas) e pequenos comércios. O turismo ali é de pequena escala (algumas pousadas, restaurantes). Portanto, o desemprego formal é alto, mas a subsistência se dá via autoemprego e economia informal. Os jovens muitas vezes buscam emprego na cidade (Maceió) ou no setor hoteleiro do litoral norte.',
    faixaEtaria:
      'Adultos jovens. Como outras vilas costeiras, há muitas famílias com filhos, então bastante gente na faixa 20–40 anos e crianças. Ao mesmo tempo, a tradição de fazer cocada é passada por senhoras (há presença de mulheres idosas doceiras). No geral, predomina a população adulta jovem, mantendo o vigor da comunidade.',
    renda:
      'Baixa. Riacho Doce, apesar do charme turístico, é pobre. A renda média das famílias é baixa, baseada em atividades informais. Em 2010 estava entre as localidades com alta proporção de população de baixa renda. Hoje, mesmo com o turismo local, a situação não mudou drasticamente.',
    empresas:
      'Poucas. O bairro deve ter algumas dezenas de empresas registradas formalmente (pousadas, restaurantes, confeitarias de cocada). A maior parte da economia é familiar e informal. Não aparece em listas de destaque, o que confirma o caráter de microeconomia local.',
    perfil:
      'Residencial rural-turístico. Riacho Doce conserva o perfil de vilarejo litorâneo, com moradores locais vivendo do mar e da culinária típica. É essencialmente residencial e ruralizado, com vocação turística artesanal (ponto de parada para comprar cocadas). Não há grandes construções ou comércio amplo – o ambiente é de comunidade pequena, integrada à natureza e à tradição.',
  },
  'Rio Novo': {
    populacao: '8.012 habitantes. Crescimento de 9,6% em relação a 2010 (7.310 hab.), mantendo-se bairro de porte modesto.',
    genero: 'Maioria feminina leve. Em 2010 as mulheres eram ~50,4%. Permanece um pequeno predomínio feminino entre os moradores.',
    emprego:
      'Vila periférica com pouca oferta local. Rio Novo é um bairro afastado, de ocupação popular. Tem poucos comércios e nenhum polo empregador – a maioria absoluta trabalha fora (Distrito Industrial de Rio Largo ou centro de Maceió). O desemprego local é elevado, pois muitos jovens não encontram colocação facilmente. Depende-se de transporte para empregos em outras localidades. Assim, enfrenta taxa de desocupação acima da média, similar a outras comunidades periféricas.',
    faixaEtaria:
      'Jovem. O bairro abriga muitas famílias em loteamentos e invasões, com alta proporção de crianças e jovens. Predominam pessoas abaixo de 40 anos, incluindo muitas crianças. A base da pirâmide etária é larga (natalidade elevada). Idosos são relativamente poucos.',
    renda:
      'Baixa. Rio Novo é um bairro de baixa renda, formado por população de trabalhadores braçais e informais. A renda domiciliar média situa-se nas faixas inferiores de Maceió. Grande parte das famílias sobreviveria com até 1–2 salários mínimos somando todas as rendas.',
    empresas:
      '470 empresas ativas – um dos 10 menores números. Isso indica que há pouco comércio formal (provavelmente mercadinhos, farmácias básicas). O bairro não tem estrutura comercial desenvolvida, atendendo-se em bairros maiores vizinhos.',
    perfil:
      'Residencial periférico/rural. Rio Novo tem características de bairro-dormitório periférico, com habitações populares e alguns traços rurais (áreas não loteadas, vegetação). É majoritariamente residencial de baixa renda, sem praticamente nenhum atrativo comercial ou industrial. Serve de moradia para quem trabalha em outras regiões, com integração limitada à malha urbana principal.',
  },
  'Santa Amélia': {
    populacao:
      '12.847 habitantes. Crescimento de ~20% sobre 2010 (10.649 hab.), mostrando expansão demográfica significativa na parte alta.',
    genero: 'Maioria feminina leve. Em 2010 mulheres ~50,4%. Continua havendo um ligeiro superávit de mulheres, refletindo o padrão geral.',
    emprego:
      'Bairro residencial emergente. Santa Amélia vem crescendo com condomínios e conjuntos habitacionais. Não possui muitas empresas – seus moradores trabalham principalmente em outras áreas (Cidade Universitária próxima, ou centro). O desemprego entre residentes pode ser mediano, semelhante à média urbana, pois há mistura de população classe média (maior empregabilidade) com população vinda de conjuntos habitacionais populares (maior vulnerabilidade).',
    faixaEtaria:
      'Adultos jovens. O crescimento populacional se deu via novas famílias jovens fixando residência. Portanto, a maioria dos habitantes está em idade ativa 20–45 anos, muitos com filhos pequenos. É um bairro “novo”, com população relativamente jovem e em expansão, poucos idosos.',
    renda:
      'Média-baixa a média. Santa Amélia tem alguns condomínios de classe média e também conjuntos habitacionais mais econômicos. A renda média fica em faixa intermediária – não é tão baixa quanto bairros periféricos tradicionais, mas também não atinge níveis altos. Em geral, moradores são funcionários públicos, pequenos empresários e trabalhadores formais, compondo uma classe média emergente.',
    empresas:
      'Poucas. O bairro ainda se configura principalmente residencial. Deve ter alguns comércios locais (padarias, mercadinhos) e pequenas empresas, mas nada de grande porte. Não aparece em relevância nos dados de empresas, sugerindo poucas centenas de estabelecimentos no máximo.',
    perfil:
      'Residencial em expansão. Santa Amélia é um bairro dormitório de crescimento recente, com condomínios fechados e conjuntos. Predomina totalmente o uso residencial, com ruas tranquilas e horizontais. Com o aumento populacional, começa a surgir um comércio local modesto, mas a essência do bairro é de moradia para quem trabalha ou estuda em bairros vizinhos.',
  },
  'Santa Lúcia': {
    populacao:
      '24.172 habitantes. Leve queda comparado a 2010 (26.061 hab.), apesar de ser parte da região alta que cresceu – possivelmente estabilização após intensa ocupação nos anos 2000.',
    genero: 'Maioria feminina. Em 2010 mulheres ~50,5%. A diferença é pequena mas presente, alinhada ao padrão dos bairros residenciais.',
    emprego:
      'Bairro popular com comércio local. Santa Lúcia compõe a região alta com Benedito Bentes, possuindo comércio de bairro e proximidade de pólos (Shopping Pátio, indústrias próximas). Muitos moradores trabalham localmente em serviços ou se deslocam para Cidade Universitária e Tabuleiro, onde há oportunidades. Ainda assim, o desemprego é um problema em parte da comunidade – taxa provavelmente um pouco acima da média urbana, dada a renda mais baixa e escolaridade limitada de muitos.',
    faixaEtaria:
      'Jovem/Adulto jovem. Assim como bairros vizinhos, Santa Lúcia abriga muitas famílias jovens. A maioria dos moradores tem menos de 40 anos e há grande quantidade de crianças e adolescentes. É um bairro relativamente novo (formado principalmente nas últimas décadas) e populoso, portanto demografia ainda “jovem”.',
    renda:
      'Baixa. Santa Lúcia é considerado um bairro de baixa renda (embora não dos mais baixos extremos). Em 2010, tinha indicadores sociais modestos. A renda domiciliar média fica na faixa da classe C/D, com muitas famílias vivendo com salário mínimo per capita ou menos. Há, porém, melhoria em parte das áreas graças a pequenas empresas locais.',
    empresas:
      '~2.599 empresas (estimado). Santa Lúcia tem um comércio local razoavelmente desenvolvido (lojas, oficinas, supermercados de bairro) para atender sua população de ~24 mil. Não é polo para a cidade inteira, mas internamente é bem servido. Esse número expressivo de empresas mostra que o bairro, apesar de periférico, criou um mercado consumidor próprio ativo.',
    perfil:
      'Residencial popular, com centro comercial local. Santa Lúcia é majoritariamente residencial, com conjuntos habitacionais e loteamentos. Entretanto, diferencia-se por ter emergido um centro comercial interno – principalmente ao longo da Av. Menino Marcelo – com lojas, mercados e serviços voltados aos moradores. Assim, pode-se dizer que é um bairro misto localmente, embora voltado quase exclusivamente ao público residente (não atrai pessoas de fora).',
  },
  'Santo Amaro': {
    populacao: '1.383 habitantes. Queda leve desde 2010 (1.927 hab.), mantendo-se como um dos bairros menos populosos.',
    genero:
      'Maioria feminina moderada. Em 2010 as mulheres eram cerca de 52% (Santo Amaro tinha 1.927 hab., com maioria feminina). Em 2022, com população menor, deve persistir predominância feminina.',
    emprego:
      'Bairro industrial desertado. Santo Amaro localiza-se numa área industrial e sofreu com o desastre da Braskem (próximo ao Mutange). Havia poucas moradias e a maioria da população trabalhava em fábricas ou usinas próximas – muitas dessas atividades fecharam ou foram afetadas. Assim, o emprego local praticamente desapareceu, e os moradores que restam possivelmente estão desempregados ou realocados. A taxa de desemprego deve ser altíssima entre os poucos residentes remanescentes.',
    faixaEtaria:
      'N/A (população muito pequena). Era um bairro minúsculo, basicamente vila operária, com população envelhecida. Hoje, com menos de 1,4 mil pessoas, não há predominância significativa além de talvez alguns adultos/idosos que não saíram.',
    renda: 'Baixa. Santo Amaro sempre foi um assentamento de baixa renda, e sua situação só piorou após a crise geológica. Os poucos habitantes têm renda modesta ou vivem de auxílio.',
    empresas:
      '149 empresas ativas – número muito baixo, indicando a virtual inexistência de comércio. Provavelmente se referem a indústrias registradas no bairro (antes havia uma usina de açúcar e destilaria) e microempresas remanescentes. Praticamente não há atividade econômica no bairro após o êxodo.',
    perfil:
      'Industrial/desocupado. Santo Amaro nunca teve perfil residencial forte – era dominado por instalações industriais e poucas casas. Com a evacuação de áreas vizinhas, tornou-se quase deserto, um bairro fantasma industrial, sem vida urbana ativa.',
  },
  'Santos Dumont': {
    populacao: '21.185 habitantes. Crescimento leve desde 2010 (20.471 hab.), mantendo-se populoso.',
    genero:
      'Maioria feminina. Em 2010 mulheres representavam ~51,5% (diferença de 679 pessoas). Continua a tendência de mais mulheres, refletindo padrões familiares com mães chefes de família.',
    emprego:
      'Populoso e carente de empregos. Santos Dumont é um bairro periférico grande, com muitos jovens. Sofre com desemprego e informalidade elevados – falta polos de emprego locais significativos. A maioria trabalha no comércio informal ou desloca-se ao centro. Projetos como o Emprega Maceió levam capacitação ao bairro visando reduzir o desemprego juvenil. Ainda assim, a taxa de desocupação é alta, possivelmente acima de 12–15%.',
    faixaEtaria:
      'Jovem. O bairro tem perfil demográfico jovem, com muitas crianças e adolescentes. A população adulta jovem (20–39 anos) é majoritária, fruto de famílias numerosas e instalação relativamente recente. Poucos idosos residem no Santos Dumont, pois é um bairro “novo” (anos 90).',
    renda:
      'Baixa. Santos Dumont surgiu de loteamentos populares e segue sendo de baixa renda. Grande parte das famílias vive com renda limitada e depende de empregos informais. Em 2010, estava entre os bairros de indicadores mais frágeis, e em 2022 essa realidade pouco mudou – apesar de alguma melhoria em infraestrutura, a renda permanece no patamar baixo.',
    empresas:
      '1.897 empresas ativas (aprox.). Há considerável número de pequenos negócios no bairro, dada sua população – mercadinhos, oficinas, lojas de variedades – atendendo à demanda local. Não é um polo para além de seus limites, mas internamente tem um comércio relativamente movimentado. O número de MEIs cresceu (ambulantes formalizados, etc.).',
    perfil:
      'Residencial popular. Santos Dumont é residencial de baixa renda, com habitações adensadas, conjuntos habitacionais e ocupações. Possui comércio de bairro ativo nas avenidas principais, porém permanece essencialmente como zona dormitório de classes trabalhadoras, com problemas sociais e infraestrutura urbana ainda insuficiente.',
  },
  'São Jorge': {
    populacao:
      '12.080 habitantes. Crescimento robusto (+43% em relação a 2010, quando tinha 8.445 hab.) – foi um dos que mais cresceram proporcionalmente desde 2000.',
    genero:
      'Maioria feminina. Em 2010, 53% eram mulheres (São Jorge foi destaque de crescimento populacional com predominância de mulheres também). Em 2022 continua apresentando mais mulheres, acompanhando a dinâmica familiar local.',
    emprego:
      'Bairro periférico em expansão, carecendo de empregos. O grande crescimento demográfico não foi acompanhado por geração de empregos locais. São Jorge é um bairro dormitório e depende de oportunidades em outros bairros. Assim, enfrenta desemprego elevado, principalmente entre a juventude. As condições econômicas lembram as do Benedito Bentes nos anos 90 – rápida ocupação, infraestrutura precária e escassez de empregos.',
    faixaEtaria:
      'Muito jovem. Com crescimento populacional acelerado por migração de famílias e alta natalidade, São Jorge tem uma população majoritariamente abaixo de 30 anos. Há muitas crianças, adolescentes e jovens adultos. A população idosa é pequena devido à recente ocupação e também possivelmente menor expectativa de vida nas camadas pobres.',
    renda:
      'Baixa. É um bairro de ocupação popular, com renda média familiar baixa. Muitos moradores vieram de grotas e ocupações, elevando a população mas não a renda agregada. Em 2010 já era um bairro de renda baixa, e mesmo tendo crescido, continua assim – possivelmente uma renda per capita entre as menores da capital.',
    empresas:
      'Poucas formalmente. Apesar do boom populacional, São Jorge não desponta pelo empreendedorismo formal. O comércio existente é basicamente informal ou microempresas familiares. Provavelmente há algumas poucas centenas de empresas registradas (lojas de bairro). Não consta entre os mais empresariais – seu crescimento foi habitacional, não econômico.',
    perfil:
      'Residencial periférico em rápido crescimento. São Jorge é hoje essencialmente residencial, com vastas áreas de conjuntos habitacionais recentes e expansão de moradias populares. O bairro cresceu de forma desordenada e agora luta por infraestrutura. Seu perfil é de cidade-dormitório de baixa renda, ainda estruturando serviços básicos para atender à população crescente.',
  },
  Serraria: {
    populacao:
      '26.590 habitantes. Crescimento de ~17% sobre 2010 (22.675 hab.), afirmando-se como um dos bairros mais habitados da parte alta.',
    genero: 'Maioria feminina leve. Em 2010 mulheres ~51%. A Serraria mantém discreta superioridade feminina, comum nos bairros urbanos de Maceió.',
    emprego:
      'Área residencial mista com algum polo comercial. Serraria tem trechos de classe média (condomínios) e trechos populares. Possui o Parque Shopping Maceió (na divisa) e várias empresas (casas de show, concessionárias) na Av. Menino Marcelo. Isso gera alguns empregos locais, mas a maioria dos moradores trabalha fora (Centro, indústrias). O desemprego entre residentes varia conforme a área – mais baixo nos condomínios de classe média (moradores empregados) e mais alto nas comunidades periféricas internas. Em média, tende a ser próximo da média de Maceió.',
    faixaEtaria:
      'Adultos jovens. Como bairro heterogêneo e em expansão, tem bastante população na faixa 20–45 anos. Nos condomínios fechados residem famílias jovens; nas áreas populares também muitas crianças. Assim, a demografia é equilibrada, mas inclinada à população jovem/adulta (com presença considerável de crianças nas vilas).',
    renda:
      'Média (com contrastes). Serraria inclui desde áreas de alta renda (e.g. condomínios como Jardim França) até bolsões de habitação simples. Em termos médios, situa-se próximo à média da cidade. Possui bom número de residentes de classe média e média-alta elevando a média de renda, mas também considerável população de renda baixa. A desigualdade interna é marcante.',
    empresas:
      '4.765 empresas ativas – o 9º maior número em Maceió. Isso se deve à grande quantidade de lojas, concessionárias, faculdades e serviços ao longo das avenidas do bairro. Serraria tornou-se um polo comercial e educacional (conta com campus universitários particulares), além de proximidade do shopping. Esse elevado quantitativo de empresas demonstra a importância econômica crescente da região.',
    perfil:
      'Misto/residencial em transformação. Tradicionalmente residencial, a Serraria nas últimas décadas passou a atrair empreendimentos comerciais e educacionais, tornando-se misto. Ainda abriga grandes conjuntos residenciais e condomínios familiares (perfil residencial forte), mas convivendo com áreas comerciais expressivas nas margens (Faculdades, grandes lojas). É um bairro de transição entre o puramente residencial e um novo centro de serviços na parte alta.',
  },
  'Tabuleiro do Martins': {
    populacao:
      '61.194 habitantes. (2º maior bairro) até 2022 (ficou atrás apenas de Cidade Universitária e B. Bentes). No entanto, registrou leve declínio desde 2010 (64.755 hab.) devido a redistribuição populacional.',
    genero: 'Maioria feminina. Em 2010 mulheres excediam homens em 4.127 pessoas. Em 2022, embora a população geral tenha caído, mantém significativo predomínio de mulheres (característica notória do Tabuleiro).',
    emprego:
      'Polo industrial e comercial da parte alta. O Tabuleiro do Martins abriga o Distrito Industrial de Maceió (DIM) e diversos atacadões e lojas de auto-serviço. É portanto um centro gerador de empregos – muitas indústrias têxteis, alimentícias e logísticas empregam moradores locais e de fora. Ainda assim, o bairro é extenso e heterogêneo: parte da população (especialmente em grotas e invasões internas) enfrenta desemprego e baixa qualificação. Assim, convive baixo desemprego entre os qualificados empregados nas indústrias e desemprego alto nas áreas pobres. Em média, a taxa fica próxima da média municipal.',
    faixaEtaria:
      'Adultos jovens. O Tabuleiro é vasto e populoso, com muitos conjuntos habitacionais. A maior parte da população está entre 15–50 anos. Há muitos jovens operários e também famílias com crianças. A faixa infantil é significativa, mas a de adultos jovens predomina, dadas as oportunidades de trabalho no próprio bairro que atraíram essa população.',
    renda:
      'Média-baixa. Apesar do parque industrial, os salários das fábricas e comércio não são altos, e muitos moradores vivem em condições modestas. Em 2010, o Tabuleiro tinha renda per capita abaixo da média de Maceió. Hoje, a presença de alguma classe média melhorou certos bolsões (p.ex. servidores morando em conjuntos), mas a renda média geral permanece relativamente baixa para o volume populacional.',
    empresas:
      '9.878 empresas ativas – o 2º maior número de Maceió, só atrás da Cidade Universitária. Isso inclui fábricas, centros de distribuição, lojas e serviços. O Tabuleiro do Martins é o coração industrial/comercial da parte alta, concentrando desde grandes indústrias até inúmeros microempreendimentos locais, o que explica a altíssima quantidade de empresas registradas.',
    perfil:
      'Misto (industrial-comercial-residencial). Tabuleiro é um bairro multifuncional: contém zonas industriais importantes, corredores comerciais (como a Av. Durval de Góes Monteiro) e extensas áreas residenciais populares (conjuntos como Village Campestre). Essa mistura define seu perfil – durante o dia é um polo de trabalho e comércio; e é também lar de dezenas de milhares de pessoas em suas vilas e conjuntos habitacionais.',
  },
  'Trapiche da Barra': {
    populacao:
      '23.041 habitantes. Pequena queda desde 2010 (25.303 hab.), possivelmente ligada a remoções em áreas de risco e perda de moradores para periferias.',
    genero: 'Maioria feminina. Em 2010 mulheres ~50,8%. Continua com leve predominância de mulheres, similar à maioria dos bairros urbanos.',
    emprego:
      'Bairro popular com equipamentos esportivos. O Trapiche abriga o Estádio Rei Pelé e o terminal rodoviário, mas fora esses pontos, é um bairro carente. A maioria dos moradores depende de empregos informais ou subempregos no centro. O desemprego é significativo, sobretudo após a desativação do lixão de Maceió que empregava catadores locais. Houve esforços de inclusão dos ex-catadores em cooperativas, mas ainda assim, o bairro sofre com falta de oportunidades – o desemprego provavelmente está acima da média.',
    faixaEtaria:
      'Adultos jovens. O bairro tem muitas famílias pobres; a maioria dos moradores está na faixa 20–40 anos tentando sustento, com muitos filhos pequenos. Há também certo envelhecimento (alguns moradores antigos permanecem), mas o grosso da população é de adultos jovens e crianças.',
    renda:
      'Baixa. Trapiche é um bairro historicamente de baixa renda (favelas e conjuntos econômicos). Mesmo com alguns investimentos (como a orla lagunar revitalizada), a renda média das famílias é baixa, dependente de trabalhos braçais e comércio informal. Permanece abaixo da média municipal em rendimentos.',
    empresas:
      'Poucas de destaque. O bairro tem comércio local (oficinas, bares, pequenas lojas) para suprir moradores e atender torcedores nos dias de jogo, mas não figura como polo comercial expressivo. Provavelmente há algumas centenas de empresas ativas. A presença do estádio e rodoviária gera movimento econômico temporário, porém isso não se traduz em grande número de estabelecimentos fixos.',
    perfil:
      'Residencial popular (com equipamentos urbanos). O Trapiche é majoritariamente residencial de classes baixas, pontuado por estruturas urbanas de escala maior (estádio, ginásio, rodoviária). Fora dos dias de eventos, é um bairro comum, com ruas de moradia simples e problemas sociais. Assim, conjuga essa vocação esportiva representativa da cidade com a realidade de um bairro carente no dia-a-dia.',
  },
  'Vergel do Lago': {
    populacao:
      '26.562 habitantes. Queda de ~15,8% desde 2010 (31.538 hab.), possivelmente devido a remoção de palafitas e realocação de famílias de áreas alagadas.',
    genero: 'Maioria feminina. Em 2010 mulheres ~50,7%. Mantém leve maioria de mulheres entre os habitantes.',
    emprego:
      'Bolsa de pobreza urbana. O Vergel localiza-se na borda da lagoa Mundaú e historicamente concentra palafitas e favelas. O desemprego é elevado – muitos sobrevivem da pesca do sururu, do subemprego ou do trabalho informal no centro. A prefeitura tem projetos de urbanização (Retirada das palafitas) e capacitação, mas o bairro ainda apresenta alto nível de desocupação e informalidade. Deve exceder a média de desemprego da cidade, refletindo a vulnerabilidade local.',
    faixaEtaria:
      'Muito jovem. O Vergel é conhecido pela alta natalidade e famílias numerosas em áreas pobres. Crianças e adolescentes formam parcela enorme da população. A maioria absoluta dos moradores tem menos de 30 anos. Poucos idosos residem ali, dada a expectativa de vida menor e a migração de alguns para casas de familiares fora.',
    renda:
      'Muito baixa. É possivelmente o bairro de menor renda de Maceió. Em 2010 figurava entre os locais de maior pobreza extrema. Grande parte das famílias vive abaixo da linha da pobreza, dependentes de benefícios sociais e do extrativismo (mariscos). A renda média per capita é baixíssima.',
    empresas:
      'Não muitas formalmente. O bairro possui feiras livres, mercadinhos e atividades informais intensas (venda de peixe, de sururu, etc.), mas poucas empresas registradas. Estima-se algumas dezenas a uma centena de pequenos negócios formais. O Vergel não aparece em estatísticas de empresas, indicando baixa formalização da economia local.',
    perfil:
      'Residencial precário (palafitas e conjuntos). O Vergel do Lago é majoritariamente residencial, marcado por habitação precária sobre as águas da lagoa e conjuntos habitacionais populares. Sofre com problemas de saneamento e pobreza, mas tem forte identidade cultural (berço de escolas de samba e do sururu). Em resumo, é um bairro dormitório de população de baixa renda, em processo lento de urbanização e remoção das palafitas.',
  },
};

const MACEIO_BAIRROS = [
  'Antares',
  'Barro Duro',
  'Bebedouro',
  'Benedito Bentes',
  'Bom Parto',
  'Canaã',
  'Centro',
  'Chã da Jaqueira',
  'Chã de Bebedouro',
  'Cidade Universitária',
  'Clima Bom',
  'Cruz das Almas',
  'Eustáquio Gomes',
  'Farol',
  'Feitosa',
  'Fernão Velho',
  'Garça Torta',
  'Gruta de Lourdes',
  'Guaxuma',
  'Industrial',
  'Ipioca',
  'Jacarecica',
  'Jacarecica II',
  'Jacintinho',
  'Jardim Petrópolis',
  'Jaraguá',
  'Jatiúca',
  'Levada',
  'Litoral Norte',
  'Mangabeiras',
  'Mutange',
  'Ouro Preto',
  'Pajuçara',
  'Pescaria',
  'Petrópolis',
  'Pinheiro',
  'Pitanguinha',
  'Poço',
  'Ponta da Terra',
  'Ponta Grossa',
  'Ponta Verde',
  'Pontal da Barra',
  'Prado',
  'Riacho Doce',
  'Rio Novo',
  'Santa Amélia',
  'Santa Lúcia',
  'Santo Amaro',
  'Santos Dumont',
  'São João',
  'São Jorge',
  'Serraria',
  'Stella Maris',
  'Tabuleiro do Martins',
  'Trapiche da Barra',
  'Vergel do Lago',
  'Village Campestre I',
  'Village Campestre II',
].sort();


/**
 * Playground component for p5js.
 */
@customElement('gdm-playground')
export class Playground extends LitElement {
  private readonly previewFrame: HTMLIFrameElement =
    document.createElement('iframe');
  
  @state()
  private selectedBairro = '';

  constructor() {
    super();
    this.previewFrame.classList.add('preview-iframe');
    this.previewFrame.setAttribute('allowTransparency', 'true');
    this.previewFrame.setAttribute('allowfullscreen', 'true');
    this.previewFrame.setAttribute('loading', 'lazy');
    this.previewFrame.setAttribute(
      'referrerpolicy',
      'no-referrer-when-downgrade',
    );
  }

  /** Disable shadow DOM */
  createRenderRoot() {
    return this;
  }

  renderMapQuery(params: MapParams) {
    // This API key is public and safe to use.
    const MAPS_API_KEY = 'AIzaSyC7c1m_Jyz3uw6lbIQUNuH3e6o0NKc_8hk';
    let src = '';
    if (params.location) {
      src = `https://www.google.com/maps/embed/v1/place?key=${MAPS_API_KEY}&q=${encodeURIComponent(params.location)}`;
    } else if (params.origin && params.destination) {
      src = `https://www.google.com/maps/embed/v1/directions?key=${MAPS_API_KEY}&origin=${encodeURIComponent(params.origin)}&destination=${encodeURIComponent(params.destination)}`;
    } else if (params.search) {
      src = `https://www.google.com/maps/embed/v1/search?key=${MAPS_API_KEY}&q=${encodeURIComponent(params.search)}`;
    }

    if (src) {
        this.previewFrame.src = src;
    }
  }

  private handleBairroChange(e: Event) {
    const select = e.target as HTMLSelectElement;
    const bairro = select.value;
    this.selectedBairro = bairro;

    if (bairro) {
      this.renderMapQuery({ location: `${bairro}, Maceió - AL, Brazil` });
    } else {
      this.renderMapQuery({ location: 'Maceió - Alagoas, Brazil' });
    }
  }

  private renderBairroInfo() {
    if (!this.selectedBairro) {
      return html`<div class="bairro-info-placeholder">
        <p>Selecione um bairro para ver os detalhes.</p>
      </div>`;
    }

    const data = BAIRRO_DATA[this.selectedBairro];

    if (!data) {
      return html`<div class="bairro-info">
        <h3>${this.selectedBairro}</h3>
        <p>Não há dados detalhados para este bairro.</p>
      </div>`;
    }

    return html`
      <div class="bairro-info">
        <h3>${this.selectedBairro}</h3>
        <p><strong>População:</strong> ${data.populacao}</p>
        <p><strong>% Homens/Mulheres:</strong> ${data.genero}</p>
        <p><strong>Emprego/Desemprego:</strong> ${data.emprego}</p>
        <p><strong>Faixa Etária Predominante:</strong> ${data.faixaEtaria}</p>
        <p><strong>Renda Média Estimada:</strong> ${data.renda}</p>
        <p><strong>Empresas/MEIs:</strong> ${data.empresas}</p>
        <p><strong>Perfil Dominante:</strong> ${data.perfil}</p>
      </div>
    `;
  }

  render() {
    return html`<div class="playground">
      <div class="sidebar">
        <div class="bairro-selector">
          <label for="bairro-select">Bairros de Maceió</label>
          <select id="bairro-select" @change=${this.handleBairroChange}>
            <option value="">Selecione um bairro...</option>
            ${MACEIO_BAIRROS.map(
              (bairro) => html`<option value=${bairro}>${bairro}</option>`
            )}
          </select>
        </div>
        ${this.renderBairroInfo()}
      </div>

      <div class="main-container">
        ${this.previewFrame}
      </div>
    </div>`;
  }
}
