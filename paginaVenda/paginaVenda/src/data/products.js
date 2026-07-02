export const WHATSAPP_NUMBER = '5543999748808';

const whatsappLink = (productName) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Olá! Quero consultar a disponibilidade do ${productName}.`,
  )}`;

export const products = [
  {
    id: 1,
    brand: 'Amazon',
    name: 'Amazon Fire TV Stick 4K',
    model: '2ª geração (2023)',
    price: 'R$ --,--',
    description: 'Fire OS, Wi-Fi 6 e reprodução em 4K Ultra HD',
    fullDescription:
      'Dispositivo de streaming da Amazon com Fire OS 8, controle remoto por voz com Alexa e suporte aos principais formatos de imagem e áudio. Requer uma TV com entrada HDMI e conteúdos compatíveis para reprodução em 4K.',
    image: null,
    features: [
      'Resolução: até 4K Ultra HD',
      'Processador: quad-core ARM Cortex-A55 de até 1,7 GHz',
      'Memória: 2 GB de RAM LPDDR4',
      'Armazenamento: 8 GB',
      'Conectividade: Wi-Fi 6 dual-band e Bluetooth 5.2 + BLE',
      'Imagem: Dolby Vision, HDR10+, HDR10 e HLG',
      'Áudio: Dolby Atmos em sistemas compatíveis',
      'Controle remoto por voz com Alexa',
    ],
  },
  {
    id: 2,
    brand: 'Tomate',
    name: 'Tomate TV Stick 4K',
    model: 'MCD-123',
    price: 'R$ --,--',
    description: 'Android TV, Google Assistente e Chromecast integrado',
    fullDescription:
      'TV Stick da Tomate para transformar televisores com entrada HDMI em uma central Android TV. O modelo MCD-123 oferece comando de voz, espelhamento via Chromecast e armazenamento interno para instalação de aplicativos compatíveis.',
    image: '/tv-stick-tomate.webp',
    features: [
      'Resolução: até 4K Ultra HD',
      'Sistema operacional: Android TV',
      'Memória: 2 GB de RAM',
      'Armazenamento: 16 GB',
      'Conectividade: Wi-Fi, HDMI e USB',
      'Google Assistente com comando de voz',
      'Chromecast integrado para espelhamento',
      'Controle remoto incluso',
    ],
  },
  {
    id: 3,
    brand: 'Xiaomi',
    name: 'Xiaomi TV Stick 4K',
    model: 'Android TV 11',
    price: 'R$ --,--',
    description: 'Dolby Vision, Chromecast e Google Assistente',
    fullDescription:
      'Dispositivo compacto da Xiaomi com Android TV 11, reprodução em 4K e controle remoto Bluetooth com infravermelho. Inclui Chromecast integrado e suporte a recursos de imagem e som em equipamentos compatíveis.',
    image: null,
    features: [
      'Resolução: até 4K Ultra HD',
      'Processador: quad-core Cortex-A35',
      'GPU: Mali-G31 MP2',
      'Memória: 2 GB de RAM',
      'Armazenamento: 8 GB',
      'Sistema operacional: Android TV 11',
      'Conectividade: Wi-Fi 2,4/5 GHz e Bluetooth',
      'Dolby Vision, Dolby Atmos e DTS HD',
      'Chromecast e Google Assistente integrados',
    ],
  },
].map((product) => ({
  ...product,
  purchaseLink: whatsappLink(product.name),
}));

export const getProductById = (id) =>
  products.find((product) => product.id === Number(id));
