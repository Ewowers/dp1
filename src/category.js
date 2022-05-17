const categorys = [
  {
    name: "videoCard",
    label: "Видео Карта",
    information: [
      { label: "Модель чипсета", name: "chipsetModel:" },
      { label: "Частота видеопроцессора OC Mode", name: "videoProcessorFrequencyOCMode" },
      { label: "Частота видеопроцессора Gaming Mode", name: "videoProcessorFrequencyGamingMode" },
      { label: "Частота видеопамяти, МГц", name: "videoMemoryFrequencyMHz" },
      { label: "Тип видеопамяти", name: "videoMemoryType" },
      { label: "Объем видеопамяти", name: "videoMemorySize" },
      { label: "Разрядность шины видеопамяти", name: "videoMemoryBusWidth" },
      { label: "Количество универсальных процессоров", name: "numberOfUniversalProcessors" },
      { label: "Разъемы", name: "connectors" },
    ],
  },
  {
    label: "Тип процессора",
    name: "processor",
    information: [
      { label: "Тип процессора", name: "processorType" },
      { label: "Сокет", name: "socket" },
      { label: "Общее количество ядер", name: "totalNumberOfCores" },
      { label: "Количество потоков", name: "numberOfThreads" },
      { label: "Тактовая частота, ГГц", name: "GHz" },
      { label: "Микроархитектура", name: "microarchitecture" },
      { label: "Объем кэша L3", name: "L3" },
      { label: "Интегрированная графическая система", name: "integratedGraphicsSystem" },
      { label: "Техпроцесс", name: "processTechnology" },
      { label: "Расчетная мощность (TDP)", name: "TDP" },
    ],
  },
  {
    label: "Материнская плата",
    name: "motherboard",
    information: [
      { label: "Сокет", name: "socket" },
      { label: "Чипсет", name: "chipset" },
      { label: "Количество потоков", name: "numberOfThreads" },
      { label: "Форм-фактор", name: "formFactor" },
      { label: "Number of memory slots", name: "numberOfMemorySlots" },
      { label: "Количество разъемов SATA 3", name: "sata" },
      { label: "Количество слотов PCI Express", name: "PCI" },
      { label: "Коннекторы питания", name: "powerConnectors" },
    ],
  },
  {
    label: "Блок питания",
    name: "powerSupply",
    information: [
      { label: "Мощность", name: "power" },
      { label: "Соответствие стандарту", name: "compliance" },
      { label: "Коннекторы питания мат. платы", name: "powerConnectorsMatFees" },
      { label: "Форм-фактор", name: "formFactor" },
      { label: "Количество PCI-E коннекторов", name: "PCI-E" },
      { label: "Количество Molex коннекторов", name: "molex" },
      { label: "Количество SATA коннекторов", name: "sata" },
      { label: "Особенности", name: "peculiarities" },
    ],
  },
];

export default categorys;
