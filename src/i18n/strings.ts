import type { DietTag } from "../data/menu";

type Diet = Record<DietTag, string>;
type Dish = { name: string; desc: string };

const es = {
  langLabel: "Idioma",
  skipLink: "Saltar al menú",
  docTitle: "Raíz · Cocina de estación · Buenos Aires",

  nav: {
    links: {
      filosofia: "Filosofía",
      menu: "Menú",
      mesa: "La mesa",
      visita: "Visitá",
    },
    cta: "Reservar",
    ctaFull: "Reservar una mesa",
    open: "Abrir menú",
    close: "Cerrar menú",
    sectionsAria: "Secciones",
  },

  hero: {
    eyebrow: "Palermo · Buenos Aires · desde 2019",
    titleLead: "Cocina de",
    titleAccent: "estación",
    lede: "Cambiamos el menú cada vez que cambia la feria. Doce mesas, una cocina abierta y lo que haya crecido esta semana a 90 kilómetros de acá.",
    ctaReserve: "Reservar una mesa",
    ctaMenu: "Ver el menú",
    cue: "Seguir",
  },

  philosophy: {
    eyebrow: "La idea",
    statement:
      "No elegimos el menú. Lo elige la tierra y nosotros ordenamos los platos.",
    body: [
      "Trabajamos con seis productores del cordón hortícola bonaerense y un tambo en Suipacha. Compramos lo que está listo, no lo que figura en una carta impresa hace seis meses. Si el jueves entran alcauciles, el viernes hay alcauciles.",
      "Fermentamos, encurtimos y secamos para estirar cada cosecha. Nada de lo que entra a la cocina se tira: el recorte de hoy es el caldo de mañana y la cáscara es el vinagre del mes que viene.",
    ],
    facts: [
      { value: "90 km", label: "radio de donde llega casi todo" },
      { value: "12", label: "mesas por servicio" },
      { value: "7", label: "pasos en el menú Raíz" },
      { value: "2019", label: "primer servicio" },
    ],
    caption: "Entrega de los martes, huerta de Open Sky, Mercedes.",
  },

  menu: {
    eyebrow: "El menú · Otoño 2026",
    title: "Lo que estamos cocinando",
    note: "El menú cambia cada vez que cambia la feria. Lo de abajo es lo que estamos cocinando esta semana.",
    typeAria: "Tipo de menú",
    tabs: { tasting: "Degustación", carte: "À la carte" },
    tasting: {
      name: "Menú Raíz",
      perPerson: (courses: number, price: string) =>
        `${courses} pasos · ${price} por persona`,
      pairing: (price: string) => `Maridaje opcional ${price}`,
      description:
        "Siete pasos que siguen a la huerta de la semana. Una sola cocina para toda la mesa; avisános las restricciones al reservar.",
      steps: [
        { name: "Encurtidos de la semana", note: "lo que sobró maduró bien" },
        { name: "Pan de masa madre, manteca ahumada", note: "masa de 30 h" },
        { name: "Zapallo asado, avellana, café", note: "st" },
        { name: "Remolachas a la sal, queso de cabra, ciruela", note: "v" },
        { name: "Ravioles de acelga y ricota, manteca noisette", note: "v" },
        { name: "Cordero de la Patagonia, hinojo, ají amarillo", note: "st" },
        { name: "Membrillo, crema quemada, hierba buena", note: "v · st" },
      ],
    },
    groups: { start: "Para empezar", mains: "Principales", desserts: "Postres" },
    dishes: {
      provoleta: {
        name: "Provoleta de campo, miel de romero",
        desc: "A la parrilla, con pan grillado y un hilo de miel infusionada.",
      },
      ensalada: {
        name: "Ensalada de estación",
        desc: "Hojas amargas de la huerta, pera, nuez pecán y vinagreta de manzana.",
      },
      empanada: {
        name: "Empanada de osobuco",
        desc: "Cocción de seis horas, masa de grasa, cortada a cuchillo. Una unidad.",
      },
      burrata: {
        name: "Burrata, tomates asados, albahaca morada",
        desc: "Tomates del último sol de la temporada, aceite de oliva de San Juan.",
      },
      bife: {
        name: "Bife de chorizo madurado 30 días",
        desc: "A las brasas de quebracho, con papas aplastadas y chimichurri de la casa.",
      },
      trucha: {
        name: "Trucha de montaña, beurre blanc de limón",
        desc: "Del criadero de Junín de los Andes, con arvejas y estragón.",
      },
      risotto: {
        name: "Risotto de hongos de pino",
        desc: "Carnaroli, caldo de gallina y hongos secados por nosotros. Terminado con parmesano.",
      },
      calabaza: {
        name: "Calabaza entera a la llama",
        desc: "Rellena de trigo burgol, garbanzos y salsa de yogur de anacardos.",
      },
      flan: {
        name: "Flan de dulce de leche, crema doble",
        desc: "El de siempre. No lo vamos a cambiar.",
      },
      tarta: {
        name: "Tarta fina de manzana, helado de crema",
        desc: "Masa quebrada, manzanas verdes finísimas, caramelo de sidra.",
      },
      chocolate: {
        name: "Chocolate 70%, aceite de oliva, sal",
        desc: "Cremoso de chocolate de origen, con crocante de cacao.",
      },
    } as Record<string, Dish>,
    diet: { v: "vegetariano", vg: "vegano", st: "sin TACC" } as Diet,
    pricesNote: "Precios en pesos, servicio no incluido.",
  },

  space: {
    eyebrow: "La mesa",
    title: "Un salón, doce mesas, una sola cocina abierta.",
    body: "No hay barra de espera ni segundo turno apurado. Reservás una mesa y es tuya toda la noche. La cocina está a la vista: vas a escuchar el fuego y ver salir cada plato.",
    facts: [
      {
        dt: "Formato",
        dd: "Degustación de 7 pasos o à la carte, misma sala.",
      },
      {
        dt: "Grupos",
        dd: "Hasta 8 personas en línea; más de 8 lo armamos aparte.",
      },
      {
        dt: "Cocina abierta",
        dd: "Pedí la mesa 1 o 2 si querés estar frente a las brasas.",
      },
    ],
  },

  reservation: {
    eyebrow: "Reservá",
    title: "Una mesa para toda la noche",
    lede: "Confirmás en el momento. Te mandamos un mail con el detalle y, si hace falta cambiar algo, respondés ese mismo mail.",
    facts: [
      { dt: "Horarios", dd: "Miércoles a sábado · turnos 19:00 y 21:15" },
      { dt: "Grupos grandes", dd: "Más de 8 personas:" },
      { dt: "Cancelaciones", dd: "Sin cargo hasta 24 h antes." },
    ],
    form: {
      date: "Fecha",
      turn: "Turno",
      guests: "Comensales",
      name: "Nombre y apellido",
      phone: "Teléfono",
      email: "Email",
      occasion: "Ocasión (opcional)",
      notes: "Alergias, restricciones o pedidos",
      guestsUnit: (n: number) => `${n} ${n === 1 ? "persona" : "personas"}`,
      removeGuest: "Quitar un comensal",
      addGuest: "Sumar un comensal",
      estimate: (total: string, pp: string) =>
        `Estimado con menú Raíz: ${total} (${pp} pp).`,
      moreThan8: "¿Son más de 8? Escribinos a",
      consent: "Acepto que Raíz guarde estos datos para gestionar la reserva.",
      submit: "Confirmar reserva",
      submitting: "Confirmando…",
      fineprint:
        "Sin pago por adelantado. Solo pedimos la tarjeta para grupos de 6 o más.",
    },
    occasions: {
      none: "Sin ocasión especial",
      birthday: "Cumpleaños",
      anniversary: "Aniversario",
      business: "Cena de trabajo",
      celebration: "Celebración",
    },
    errors: {
      "date.required": "Elegí una fecha",
      "date.past": "Esa fecha ya pasó",
      "date.future": "Tomamos reservas con hasta 60 días de anticipación",
      "turn.required": "Elegí un turno",
      "name.min": "Ingresá tu nombre",
      "email.invalid": "Revisá el email",
      "phone.min": "Ingresá un teléfono de contacto",
      "phone.chars": "Solo números y + ( ) -",
      "notes.max": "Te pasaste del máximo de caracteres",
      "consent.required":
        "Necesitamos tu confirmación para guardar la reserva",
    } as Record<string, string>,
    banner: {
      text: "No pudimos conectar con el sistema de reservas. Probá de nuevo en un momento.",
      dismiss: "Descartar aviso",
    },
    live: {
      submitting: "Enviando la reserva…",
      success: "Reserva confirmada.",
      error: "No pudimos confirmar la reserva.",
    },
    confirmed: {
      title: (name: string) => `Listo, ${name}.`,
      copy: (code: string) =>
        `Guardamos tu mesa. Te llega el detalle por mail con el código ${code}.`,
      summary: { day: "Día", turn: "Turno", guests: "Comensales" },
      turnUnit: (t: string) => `${t} h`,
      again: "Hacer otra reserva",
    },
  },

  footer: {
    tagline: "Cocina de estación desde 2019.",
    visit: "Visitá",
    hours: "Horarios",
    contact: "Contacto",
    address: ["Gorriti 4820, Palermo", "Ciudad de Buenos Aires"],
    directions: "Cómo llegar",
    hoursLine1: "Miércoles a sábado",
    hoursLine2: "Turnos 19:00 y 21:15",
    closed: "Domingo, lunes y martes: cerrado",
    newsletter: "Newsletter",
    backToTop: "Volver arriba",
    author: "Diseño y desarrollo de Gabrielly Ferreira",
    rights: (year: number) =>
      `© ${year} Raíz. Sitio de demostración, proyecto de portafolio. No es un local real.`,
  },
};

export type Dict = typeof es;

const en: Dict = {
  langLabel: "Language",
  skipLink: "Skip to the menu",
  docTitle: "Raíz · Seasonal kitchen · Buenos Aires",

  nav: {
    links: {
      filosofia: "Philosophy",
      menu: "Menu",
      mesa: "The room",
      visita: "Visit",
    },
    cta: "Book",
    ctaFull: "Book a table",
    open: "Open menu",
    close: "Close menu",
    sectionsAria: "Sections",
  },

  hero: {
    eyebrow: "Palermo · Buenos Aires · since 2019",
    titleLead: "A seasonal",
    titleAccent: "kitchen",
    lede: "We change the menu every time the market changes. Twelve tables, an open kitchen and whatever grew this week within 90 kilometres of here.",
    ctaReserve: "Book a table",
    ctaMenu: "See the menu",
    cue: "Scroll",
  },

  philosophy: {
    eyebrow: "The idea",
    statement:
      "We don't choose the menu. The land does, and we just put the courses in order.",
    body: [
      "We work with six growers from the Buenos Aires market gardens and a dairy in Suipacha. We buy what's ready, not what's printed on a card from six months ago. If artichokes come in on Thursday, there are artichokes on Friday.",
      "We ferment, pickle and dry to stretch every harvest. Nothing that comes into the kitchen is thrown away: today's trimmings are tomorrow's stock, and the peel is next month's vinegar.",
    ],
    facts: [
      { value: "90 km", label: "radius most of it travels from" },
      { value: "12", label: "tables per service" },
      { value: "7", label: "courses in the Raíz menu" },
      { value: "2019", label: "first service" },
    ],
    caption: "Tuesday delivery, Open Sky garden, Mercedes.",
  },

  menu: {
    eyebrow: "The menu · Autumn 2026",
    title: "What we're cooking",
    note: "The menu changes every time the market changes. Below is what we're cooking this week.",
    typeAria: "Menu type",
    tabs: { tasting: "Tasting", carte: "À la carte" },
    tasting: {
      name: "Raíz Menu",
      perPerson: (courses: number, price: string) =>
        `${courses} courses · ${price} per person`,
      pairing: (price: string) => `Optional wine pairing ${price}`,
      description:
        "Seven courses that follow the week's garden. One kitchen for the whole table; tell us about any restrictions when you book.",
      steps: [
        { name: "Pickles of the week", note: "the leftovers aged well" },
        { name: "Sourdough bread, smoked butter", note: "30 h dough" },
        { name: "Roast squash, hazelnut, coffee", note: "st" },
        { name: "Salt-baked beets, goat cheese, plum", note: "v" },
        { name: "Chard and ricotta ravioli, brown butter", note: "v" },
        { name: "Patagonian lamb, fennel, yellow chilli", note: "st" },
        { name: "Quince, burnt cream, mint", note: "v · st" },
      ],
    },
    groups: { start: "To start", mains: "Mains", desserts: "Desserts" },
    dishes: {
      provoleta: {
        name: "Grilled provolone, rosemary honey",
        desc: "Off the grill, with charred bread and a drizzle of infused honey.",
      },
      ensalada: {
        name: "Seasonal salad",
        desc: "Bitter garden leaves, pear, pecans and an apple vinaigrette.",
      },
      empanada: {
        name: "Osso buco empanada",
        desc: "Six-hour braise, lard pastry, hand-cut. One piece.",
      },
      burrata: {
        name: "Burrata, roast tomatoes, purple basil",
        desc: "Tomatoes from the season's last sun, San Juan olive oil.",
      },
      bife: {
        name: "Sirloin, aged 30 days",
        desc: "Over quebracho coals, with smashed potatoes and house chimichurri.",
      },
      trucha: {
        name: "Mountain trout, lemon beurre blanc",
        desc: "From the Junín de los Andes farm, with peas and tarragon.",
      },
      risotto: {
        name: "Pine mushroom risotto",
        desc: "Carnaroli, chicken stock and mushrooms we dry ourselves. Finished with parmesan.",
      },
      calabaza: {
        name: "Whole flame-roasted squash",
        desc: "Stuffed with bulgur wheat, chickpeas and a cashew yoghurt sauce.",
      },
      flan: {
        name: "Dulce de leche flan, double cream",
        desc: "The same one as always. We're not changing it.",
      },
      tarta: {
        name: "Thin apple tart, cream ice cream",
        desc: "Shortcrust, paper-thin green apples, cider caramel.",
      },
      chocolate: {
        name: "70% chocolate, olive oil, salt",
        desc: "Single-origin chocolate cremoso with a cocoa crunch.",
      },
    },
    diet: { v: "vegetarian", vg: "vegan", st: "gluten-free" },
    pricesNote: "Prices in pesos, service not included.",
  },

  space: {
    eyebrow: "The room",
    title: "One room, twelve tables, a single open kitchen.",
    body: "No waiting bar, no rushed second seating. You book a table and it's yours all night. The kitchen is in full view: you'll hear the fire and watch every plate go out.",
    facts: [
      { dt: "Format", dd: "7-course tasting or à la carte, same room." },
      {
        dt: "Groups",
        dd: "Up to 8 people online; more than 8 we arrange separately.",
      },
      {
        dt: "Open kitchen",
        dd: "Ask for table 1 or 2 to sit facing the coals.",
      },
    ],
  },

  reservation: {
    eyebrow: "Book",
    title: "A table for the whole night",
    lede: "You get instant confirmation. We email you the details and, if anything needs to change, you just reply to that email.",
    facts: [
      { dt: "Hours", dd: "Wednesday to Saturday · seatings 19:00 and 21:15" },
      { dt: "Large groups", dd: "More than 8 people:" },
      { dt: "Cancellations", dd: "Free up to 24 h before." },
    ],
    form: {
      date: "Date",
      turn: "Seating",
      guests: "Guests",
      name: "Full name",
      phone: "Phone",
      email: "Email",
      occasion: "Occasion (optional)",
      notes: "Allergies, restrictions or requests",
      guestsUnit: (n: number) => `${n} ${n === 1 ? "person" : "people"}`,
      removeGuest: "Remove one guest",
      addGuest: "Add one guest",
      estimate: (total: string, pp: string) =>
        `Estimate with the Raíz menu: ${total} (${pp} pp).`,
      moreThan8: "More than 8? Write to us at",
      consent: "I agree to Raíz storing this data to manage the booking.",
      submit: "Confirm booking",
      submitting: "Confirming…",
      fineprint:
        "No payment upfront. We only ask for a card for groups of 6 or more.",
    },
    occasions: {
      none: "No special occasion",
      birthday: "Birthday",
      anniversary: "Anniversary",
      business: "Work dinner",
      celebration: "Celebration",
    },
    errors: {
      "date.required": "Pick a date",
      "date.past": "That date has already passed",
      "date.future": "We take bookings up to 60 days ahead",
      "turn.required": "Pick a seating",
      "name.min": "Enter your name",
      "email.invalid": "Check the email",
      "phone.min": "Enter a contact phone",
      "phone.chars": "Numbers and + ( ) - only",
      "notes.max": "You've gone over the character limit",
      "consent.required": "We need your confirmation to save the booking",
    },
    banner: {
      text: "We couldn't reach the booking system. Try again in a moment.",
      dismiss: "Dismiss notice",
    },
    live: {
      submitting: "Sending the booking…",
      success: "Booking confirmed.",
      error: "We couldn't confirm the booking.",
    },
    confirmed: {
      title: (name: string) => `You're set, ${name}.`,
      copy: (code: string) =>
        `Your table is saved. You'll get the details by email with the code ${code}.`,
      summary: { day: "Day", turn: "Seating", guests: "Guests" },
      turnUnit: (t: string) => `${t} h`,
      again: "Make another booking",
    },
  },

  footer: {
    tagline: "A seasonal kitchen since 2019.",
    visit: "Visit",
    hours: "Hours",
    contact: "Contact",
    address: ["Gorriti 4820, Palermo", "City of Buenos Aires"],
    directions: "Get directions",
    hoursLine1: "Wednesday to Saturday",
    hoursLine2: "Seatings 19:00 and 21:15",
    closed: "Sunday, Monday and Tuesday: closed",
    newsletter: "Newsletter",
    backToTop: "Back to top",
    author: "Designed and built by Gabrielly Ferreira",
    rights: (year: number) =>
      `© ${year} Raíz. Demo site, a portfolio project. Not a real venue.`,
  },
};

const pt: Dict = {
  langLabel: "Idioma",
  skipLink: "Pular para o cardápio",
  docTitle: "Raíz · Cozinha de estação · Buenos Aires",

  nav: {
    links: {
      filosofia: "Filosofia",
      menu: "Cardápio",
      mesa: "O salão",
      visita: "Visite",
    },
    cta: "Reservar",
    ctaFull: "Reservar uma mesa",
    open: "Abrir menu",
    close: "Fechar menu",
    sectionsAria: "Seções",
  },

  hero: {
    eyebrow: "Palermo · Buenos Aires · desde 2019",
    titleLead: "Cozinha de",
    titleAccent: "estação",
    lede: "Mudamos o cardápio toda vez que a feira muda. Doze mesas, uma cozinha aberta e o que cresceu esta semana a 90 quilômetros daqui.",
    ctaReserve: "Reservar uma mesa",
    ctaMenu: "Ver o cardápio",
    cue: "Seguir",
  },

  philosophy: {
    eyebrow: "A ideia",
    statement:
      "Não escolhemos o cardápio. A terra escolhe, e nós só colocamos os pratos em ordem.",
    body: [
      "Trabalhamos com seis produtores do cinturão verde de Buenos Aires e um laticínio em Suipacha. Compramos o que está pronto, não o que está impresso num cardápio de seis meses atrás. Se na quinta chegam alcachofras, na sexta tem alcachofra.",
      "Fermentamos, conservamos e secamos para esticar cada colheita. Nada do que entra na cozinha se joga fora: a apara de hoje é o caldo de amanhã e a casca é o vinagre do mês que vem.",
    ],
    facts: [
      { value: "90 km", label: "raio de onde vem quase tudo" },
      { value: "12", label: "mesas por serviço" },
      { value: "7", label: "passos no menu Raíz" },
      { value: "2019", label: "primeiro serviço" },
    ],
    caption: "Entrega das terças, horta da Open Sky, Mercedes.",
  },

  menu: {
    eyebrow: "O cardápio · Outono 2026",
    title: "O que estamos cozinhando",
    note: "O cardápio muda toda vez que a feira muda. Abaixo está o que estamos cozinhando esta semana.",
    typeAria: "Tipo de cardápio",
    tabs: { tasting: "Degustação", carte: "À la carte" },
    tasting: {
      name: "Menu Raíz",
      perPerson: (courses: number, price: string) =>
        `${courses} passos · ${price} por pessoa`,
      pairing: (price: string) => `Harmonização opcional ${price}`,
      description:
        "Sete passos que seguem a horta da semana. Uma só cozinha para a mesa toda; conte-nos as restrições ao reservar.",
      steps: [
        { name: "Conservas da semana", note: "o que sobrou maturou bem" },
        { name: "Pão de fermentação natural, manteiga defumada", note: "massa de 30 h" },
        { name: "Abóbora assada, avelã, café", note: "st" },
        { name: "Beterrabas na sal, queijo de cabra, ameixa", note: "v" },
        { name: "Ravioli de acelga e ricota, manteiga noisette", note: "v" },
        { name: "Cordeiro da Patagônia, funcho, pimenta amarela", note: "st" },
        { name: "Marmelo, creme queimado, hortelã", note: "v · st" },
      ],
    },
    groups: { start: "Para começar", mains: "Principais", desserts: "Sobremesas" },
    dishes: {
      provoleta: {
        name: "Provolone na brasa, mel de alecrim",
        desc: "Na grelha, com pão tostado e um fio de mel infusionado.",
      },
      ensalada: {
        name: "Salada de estação",
        desc: "Folhas amargas da horta, pera, noz-pecã e vinagrete de maçã.",
      },
      empanada: {
        name: "Empanada de ossobuco",
        desc: "Cozimento de seis horas, massa de gordura, cortada à faca. Uma unidade.",
      },
      burrata: {
        name: "Burrata, tomates assados, manjericão roxo",
        desc: "Tomates do último sol da temporada, azeite de San Juan.",
      },
      bife: {
        name: "Bife de chorizo maturado 30 dias",
        desc: "Nas brasas de quebracho, com batatas amassadas e chimichurri da casa.",
      },
      trucha: {
        name: "Truta de montanha, beurre blanc de limão",
        desc: "Do criadouro de Junín de los Andes, com ervilhas e estragão.",
      },
      risotto: {
        name: "Risoto de cogumelos do pinheiro",
        desc: "Carnaroli, caldo de galinha e cogumelos secos por nós. Finalizado com parmesão.",
      },
      calabaza: {
        name: "Abóbora inteira na chama",
        desc: "Recheada com trigo burgol, grão-de-bico e molho de iogurte de castanha de caju.",
      },
      flan: {
        name: "Pudim de doce de leite, creme duplo",
        desc: "O de sempre. Não vamos mudar.",
      },
      tarta: {
        name: "Torta fina de maçã, sorvete de creme",
        desc: "Massa amanteigada, maçãs verdes bem finas, caramelo de sidra.",
      },
      chocolate: {
        name: "Chocolate 70%, azeite, sal",
        desc: "Cremoso de chocolate de origem, com crocante de cacau.",
      },
    },
    diet: { v: "vegetariano", vg: "vegano", st: "sem glúten" },
    pricesNote: "Preços em pesos, serviço não incluído.",
  },

  space: {
    eyebrow: "O salão",
    title: "Um salão, doze mesas, uma só cozinha aberta.",
    body: "Não tem bar de espera nem segundo turno apressado. Você reserva uma mesa e ela é sua a noite toda. A cozinha fica à vista: você vai ouvir o fogo e ver cada prato sair.",
    facts: [
      { dt: "Formato", dd: "Degustação de 7 passos ou à la carte, mesmo salão." },
      {
        dt: "Grupos",
        dd: "Até 8 pessoas on-line; acima de 8 combinamos à parte.",
      },
      {
        dt: "Cozinha aberta",
        dd: "Peça a mesa 1 ou 2 para ficar de frente para as brasas.",
      },
    ],
  },

  reservation: {
    eyebrow: "Reserve",
    title: "Uma mesa para a noite toda",
    lede: "A confirmação é na hora. Enviamos um e-mail com os detalhes e, se precisar mudar algo, é só responder esse mesmo e-mail.",
    facts: [
      { dt: "Horários", dd: "Quarta a sábado · turnos 19:00 e 21:15" },
      { dt: "Grupos grandes", dd: "Acima de 8 pessoas:" },
      { dt: "Cancelamentos", dd: "Sem custo até 24 h antes." },
    ],
    form: {
      date: "Data",
      turn: "Turno",
      guests: "Pessoas",
      name: "Nome e sobrenome",
      phone: "Telefone",
      email: "E-mail",
      occasion: "Ocasião (opcional)",
      notes: "Alergias, restrições ou pedidos",
      guestsUnit: (n: number) => `${n} ${n === 1 ? "pessoa" : "pessoas"}`,
      removeGuest: "Tirar uma pessoa",
      addGuest: "Somar uma pessoa",
      estimate: (total: string, pp: string) =>
        `Estimativa com o menu Raíz: ${total} (${pp} pp).`,
      moreThan8: "São mais de 8? Escreva para",
      consent: "Concordo que a Raíz guarde estes dados para gerir a reserva.",
      submit: "Confirmar reserva",
      submitting: "Confirmando…",
      fineprint:
        "Sem pagamento adiantado. Só pedimos o cartão para grupos de 6 ou mais.",
    },
    occasions: {
      none: "Sem ocasião especial",
      birthday: "Aniversário",
      anniversary: "Bodas",
      business: "Jantar de trabalho",
      celebration: "Comemoração",
    },
    errors: {
      "date.required": "Escolha uma data",
      "date.past": "Essa data já passou",
      "date.future": "Aceitamos reservas com até 60 dias de antecedência",
      "turn.required": "Escolha um turno",
      "name.min": "Digite seu nome",
      "email.invalid": "Revise o e-mail",
      "phone.min": "Digite um telefone de contato",
      "phone.chars": "Somente números e + ( ) -",
      "notes.max": "Você passou do limite de caracteres",
      "consent.required": "Precisamos da sua confirmação para guardar a reserva",
    },
    banner: {
      text: "Não conseguimos conectar ao sistema de reservas. Tente de novo em um instante.",
      dismiss: "Descartar aviso",
    },
    live: {
      submitting: "Enviando a reserva…",
      success: "Reserva confirmada.",
      error: "Não conseguimos confirmar a reserva.",
    },
    confirmed: {
      title: (name: string) => `Pronto, ${name}.`,
      copy: (code: string) =>
        `Sua mesa está guardada. Você recebe os detalhes por e-mail com o código ${code}.`,
      summary: { day: "Dia", turn: "Turno", guests: "Pessoas" },
      turnUnit: (t: string) => `${t} h`,
      again: "Fazer outra reserva",
    },
  },

  footer: {
    tagline: "Cozinha de estação desde 2019.",
    visit: "Visite",
    hours: "Horários",
    contact: "Contato",
    address: ["Gorriti 4820, Palermo", "Cidade de Buenos Aires"],
    directions: "Como chegar",
    hoursLine1: "Quarta a sábado",
    hoursLine2: "Turnos 19:00 e 21:15",
    closed: "Domingo, segunda e terça: fechado",
    newsletter: "Newsletter",
    backToTop: "Voltar ao topo",
    author: "Design e desenvolvimento de Gabrielly Ferreira",
    rights: (year: number) =>
      `© ${year} Raíz. Site de demonstração, projeto de portfólio. Não é um local real.`,
  },
};

export const STRINGS = { es, en, pt };
export type Lang = keyof typeof STRINGS;

export const LANG_OPTIONS: { code: Lang; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "es", label: "ESP" },
  { code: "pt", label: "PORT" },
];

/** locale para Intl (fechas). Los precios se muestran siempre en formato es-AR. */
export const DATE_LOCALE: Record<Lang, string> = {
  es: "es-AR",
  en: "en-GB",
  pt: "pt-BR",
};
