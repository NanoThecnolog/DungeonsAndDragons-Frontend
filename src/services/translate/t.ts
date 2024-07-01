export function t(name: string): string {
    const translation = new Map<string, string>([

        //textos e descrições
        ['As a high elf', 'Como Alto Elfo'],
        ['Dragonborn look very much like dragons standing erect in humanoid form, though they lack wings or a tail', 'Draconato se parece muito com dragões eretos em forma humanoide, embora não tenham asas ou cauda'],
        ['you have a keen mind and a mastery of at least the basics of magic', 'você uma mente aguçada e um domínio de, pelo menos, os princípios básicos da magia'],
        ['In many fantasy gaming worlds, there are two kinds of high elves', 'Em muitos mundos de D&D, existem dois tipos de elfos superiores'],
        ['One type is haughty and reclusive, believing themselves to be superior to non-elves and even other elves', 'Um tipo (que inclui os elfos cinzentos e elfos do vale de Greyhawk, os Silvanesti de Dragonlance, e os elfos do sol dos Reinos Esquecidos) são arrogantes e reclusos, acreditando serem superiores aos não elfos e até mesmo a outros elfos'],
        ['The other type is more common and more friendly, and often encountered among humans and other races', ' O outro tipo (como os altos elfos de Greyhawk, os Qualinesti de Dragonlance e os elfos da lua dos Reinos Esquecidos) são mais comuns e amigáveis, e muitas vezes encontrados entre humanos e outras raças'],

        ['To be greeted with stares and whispers, to suffer violence and insult on the street, to see mistrust and fear in every eye: this is the lot of the tiefling', 'Ser saudado com olhares e sussurros, sofrer violência e insultos nas ruas, ver desconfiança e medo em todos os olhos: esse é o destino do tiefling'],
        ['Tieflings mature at the same rate as humans but live a few years longer', 'Os tieflings amadurecem na mesma proporção que os humanos, mas vivem mais alguns anos'],
        //descrições de idiomas
        ['You can speak, read, and write Common and one extra language of your choice', 'Você pode falar, ler e escrever o idioma comum e um idioma extra de sua escolha'],
        ['Humans typically learn the languages of other peoples they deal with, including obscure dialects', 'Os humanos normalmente aprendem as línguas de outros povos com os quais se envolve, incluindo dialetos obscuros'],
        ['They are fond of sprinkling their speech with words borrowed from other tongues: Orc curses, Elvish musical expressions, Dwarvish military phrases, and so on', 'Eles gostam de polvilhar sua fala com palavras emprestadas de outras línguas: maldições orcs, expressões musicais élficas, frases militares anãs e assim por diante'],
        ['You have resistance to fire damage', 'Você tem resistência a dano de fogo'],

        //Traços específicos de raças e subraças
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
        ['draconic ancestry', ''],
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
        ['Darkvision', 'Visão Noturna'],
        ['Hellish Resistance', 'Resistência Infernal.'],
        ['infernal Legacy', 'Legado infernal'],
        ['you know the thaumaturgy cantrip', 'você conhece o truque de taumaturgia'],
        ['You have superior vision in dark and dim conditions', 'Você tem uma visão superior em condições de escuridão e penumbra'],
        ['you can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light', 'Você pode ver na penumbra num raio de 60 pés como se fosse uma luz brilhante, e na escuridão como se fosse uma luz fraca'],

        ['You cannot discern color in darkness, only shades of gray', 'Você não se consegue discernir a cor na escuridão, apenas os tons de cinza'],
        ['When you reach 3rd level, you can cast the hellish rebuke spell as a 2nd-level spell once with this trait and regain the ability to do so when you finish a long rest', 'Quando atingir o 3º nível, você pode lançar o feitiço de repreensão infernal como um feitiço de 2º nível uma vez com este traço e recupera a capacidade de utilizar esse traço novamente quando terminar um descanso longo'],
        ['When you reach 5th level, you can cast the darkness spell once with this trait and regain the ability to do so when you finish a long rest', 'Quando atingir o 5º nível, você pode lançar o feitiço de escuridão uma vez com este atributo e recupera a capacidade de utilizar esse traço novamente quando acabar um descanso longo'],
        ['', ''],
        ['', ''],
        ['', ''],

        //atributos
        ['STR', 'Força'],
        ['DEX', 'Destreza'],
        ['CON', 'Constituição'],
        ['INT', 'Inteligência'],
        ['WIS', 'Sabedoria'],
        ['CHA', 'Carisma'],

        //frases e termos mais comuns
        ['Saving Throw', 'Testes de resistência'],
        ['speak, read, and write', 'falar, ler, e escrever'],


        //tipos de dano
        ['Acid', 'Ácido'],
        ['Lightning', 'Elétrico'],
        ['Cold', 'Frio'],
        ['Poison', 'Veneno'],
        ['Fire', 'Fogo'],

        //tipos de área de efeito
        ['line', 'Linha'],
        ['cone', 'Cone'],

        //raças e subraças
        ['dragonborn', 'Draconato'],
        ['hill dwarf', 'Anão da Colina'],
        ['dwarf', 'Anão'],
        ['Half-Elf', 'Meio Elfo'],
        ['high elf', 'Alto Elfo'],
        ['elf', 'Elfo'],
        ['rock gnome', 'Gnomo das Rochas'],
        ['Gnome', 'Gnomo'],
        ['half-orc', 'Meio Orc'],
        ['human', 'humano'],
        ['lightfoot-halfling', 'Pés ligeiros'],

        //classes
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

        //Ferramentas
        ["smith's tools", 'Ferramentas de Ferreiro'],
        ["brewer's supplies", 'Suprimentos para Cervejeiros'],
        ["mason's tools", 'Ferramentas de Pedreiro'],
        ['smiths-tools', 'Ferramentas de Ferreiro'],
        ['brewers-supplies', 'Suprimentos para Cervejeiros'],
        ['masons-tools', 'Ferramentas de Pedreiro'],

        // Idiomas
        ['Dwarvish', 'Idioma dos Anões'],
        ['Common', 'Idioma comum'],
        ['Giant', 'Idioma dos Gigantes'],
        ['Gnomish', 'Idioma dos Gnomos'],
        ['Goblin', 'Idioma dos Goblins'],
        ['Halfling', 'Halfling'],
        ['Elvish', 'Idioma dos Elfos'],
        ['Orc', 'Orc'],
        ['Abyssal', 'Idioma Abissal'],
        ['Celestial', 'Idioma Celestial'],
        ['draconic', 'Idioma Dracônico'],
        ['Deep Speech', 'Dialeto do Subterrâneo'],
        ['Deep-Speech', 'Dialeto do Subterrâneo'],
        ['Infernal', 'Infernal'],
        ['Primordial', 'Idioma Primordial'],
        ['Sylvan', 'Idioma Silvestre'],
        ['undercommon', 'Idioma dos comerciantes do subterrâneo'],

        //Perícias
        ['Skill: acrobatics', 'Acrobacia'],
        ['Skill: animal handling', 'Adestrar Animais'],
        ['Skill: arcana', 'Arcanismo'],
        ['Skill: athletics', 'Atletismo'],
        ['Skill: deception', 'Enganação'],
        ['Skill: history', 'História'],
        ['Skill: insight', 'Intuição'],
        ['Skill: intimidation', 'Intimidação'],
        ['Skill: investigation', 'Investigação'],
        ['Skill: medicine', 'Medicina'],
        ['Skill: nature', 'Natureza'],
        ['Skill: perception', 'Percepção'],
        ['Skill: performance', 'Atuação'],
        ['Skill: persuasion', 'Persuasão'],
        ['Skill: religion', 'Religião'],
        ['Skill: sleight of hand', 'Prestidigitação'],
        ['Skill: stealth', 'Furtividade'],
        ['Skill: survival', 'Sobrevivência'],
        ['Skill-acrobatics', 'Acrobacia'],
        ['Skill-animal-handling', 'Adestrar Animais'],
        ['Skill-arcana', 'Arcanismo'],
        ['Skill-athletics', 'Atletismo'],
        ['Skill-deception', 'Enganação'],
        ['Skill-history', 'História'],
        ['Skill-insight', 'Intuição'],
        ['Skill-intimidation', 'Intimidação'],
        ['Skill-investigation', 'Investigação'],
        ['Skill-medicine', 'Medicina'],
        ['Skill-nature', 'Natureza'],
        ['Skill-perception', 'Percepção'],
        ['Skill-performance', 'Atuação'],
        ['Skill-persuasion', 'Persuasão'],
        ['Skill-religion', 'Religião'],
        ['Skill-sleight-of-hand', 'Prestidigitação'],
        ['Skill-stealth', 'Furtividade'],
        ['Skill-survival', 'Sobrevivência'],

        //palavras soltas
        // ['you', 'você'],
        // ['can', 'pode'],
        // ['read', 'ler'],
        // ['write', 'escrever'],
        // ['speak', 'falar'],
        // ['and', 'e'],
        // ['have', 'tem'],
        ['', ''],


    ])

    // const specialChar = '␂';
    let translated = name;


    translation.forEach((value, key) => {
        const regex = new RegExp(`\\b${escapeRegExp(key)}\\b`, 'gi');
        translated = translated.replace(regex, value);
    });
    translated = translated.replace(/\b([\w.-]+)\b/g, (match) => {
        const lowerCaseWord = match.toLowerCase();
        return translation.get(lowerCaseWord) || match;
    });
    return translated;
}
function escapeRegExp(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
