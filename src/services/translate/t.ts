export function t(name: string): string {
    const translation = new Map<string, string>([

        ['As a high elf', 'Como Alto Elfo'],
        ['you have a keen mind and a mastery of at least the basics of magic', 'você uma mente aguçada e um domínio de, pelo menos, os princípios básicos da magia'],
        ['In many fantasy gaming worlds, there are two kinds of high elves', 'Em muitos mundos de D&D, existem dois tipos de elfos superiores'],
        ['One type is haughty and reclusive, believing themselves to be superior to non-elves and even other elves', 'Um tipo (que inclui os elfos cinzentos e elfos do vale de Greyhawk, os Silvanesti de Dragonlance, e os elfos do sol dos Reinos Esquecidos) são arrogantes e reclusos, acreditando serem superiores aos não elfos e até mesmo a outros elfos'],
        ['The other type is more common and more friendly, and often encountered among humans and other races', ' O outro tipo (como os altos elfos de Greyhawk, os Qualinesti de Dragonlance e os elfos da lua dos Reinos Esquecidos) são mais comuns e amigáveis, e muitas vezes encontrados entre humanos e outras raças'],
        ['draconic-ancestry-brass', 'Dragão de Latão'],
        ['draconic-ancestry-black', 'Dragão Negro'],
        ['draconic-ancestry-blue', 'Dragão Azul'],
        ['draconic-ancestry-bronze', 'Dragão de Bronze'],
        ['draconic-ancestry-copper', 'Dragão de Cobre'],
        ['draconic-ancestry-gold', 'Dragão de Ouro'],
        ['draconic-ancestry-green', 'Dragão Verde'],
        ['draconic-ancestry-Silver', 'Dragão de Prata'],
        ['draconic-ancestry-white', 'Dragão Branco'],
        ['draconic-ancestry-red', 'Dragão Vermelho'],
        ['STR', 'Força'],
        ['DEX', 'Destreza'],
        ['CON', 'Constituição'],
        ['INT', 'Inteligência'],
        ['WIS', 'Sabedoria'],
        ['CHA', 'Carisma'],
        ['Saving Throw', 'Testes de resistência'],
        ['Black', 'Negro'],
        ['Blue', 'Azul'],
        ['Brass', 'Latão'],
        ['Bronze', 'Bronze'],
        ['Copper', 'Cobre'],
        ['Gold', 'Ouro'],
        ['Green', 'Verde'],
        ['Red', 'Vermelho'],
        ['Silver', 'Prata'],
        ['White', 'Branco'],
        ['Acid', 'Ácido'],
        ['Lightning', 'Elétrico'],
        ['Cold', 'Frio'],
        ['Poison', 'Veneno'],
        ['Fire', 'Fogo'],
        ['line', 'Linha'],
        ['cone', 'Cone'],
        ['speak, read, and write', 'falar, ler, e escrever'],
        ['you can', 'Você pode'],
        ['dragonborn', 'Draconato'],
        ['hill dwarf', 'Anão da Colina'],
        ['dwarf', 'Anão'],
        ['Half-elf', 'Meio Elfo'],
        ['high elf', 'Alto Elfo'],
        ['elf', 'Elfo'],
        ['rock gnome', 'Gnomo das Rochas'],
        ['Gnome', 'Gnomo'],
        ['half-orc', 'Meio Orc'],
        ['human', 'humano'],
        ['lightfoot-halfling', 'Pés ligeiros'],
        ['barbarian', 'Bárbaro'],
        ['Bard', 'Bardo'],
        ['cleric', 'Clérigo'],
        ['Druid', 'Drúida'],
        ['fighter', 'Guerreiro'],
        ['monk', 'Monge'],
        ['paladin', 'Paladino'],
        ['ranger', 'Patrulheiro'],
        ['rogue', 'Ladino'],
        ['sorcerer', 'Feiticeiro'],
        ['Warlock', 'Bruxo'],
        ['Wizard', 'Mago'],
        ['medium', 'Mediano'],
        ['draconic ancestry', ''],
        ['draconic', 'draconico'],
        ['Ancestry', 'Ancestral'],
        ['', ''],


    ])

    let translated = name;
    translation.forEach((value, key) => {
        const regex = new RegExp(`\\b${escapeRegExp(key)}\\b`, 'gi');
        translated = translated.replace(regex, value);
    });
    translated = translated.replace(/\b([\w.-]+)\b/g, (match, word) => {
        const lowerCaseWord = word.toLowerCase();
        return translation.has(lowerCaseWord) ? translation.get(lowerCaseWord)! : match;
    });
    translated = translated.replace(/([\w.-]+)\./g, (match, word) => {
        const lowerCaseWord = word.toLowerCase();
        return translation.has(lowerCaseWord) ? `${translation.get(lowerCaseWord)!}.` : match;
    });
    return translated;
}
function escapeRegExp(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
