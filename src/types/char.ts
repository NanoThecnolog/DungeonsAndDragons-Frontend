export interface ClassDataProps {
    name: string;
    data: {
        class_levels: string
        hit_die: number
        index: string
        multi_classing: {
            prerequisites: [
                {
                    ability_score: {
                        index: string;
                        name: string;
                        url: string;
                    }
                    minimum_score: number
                }
            ]
        }
        proficiencies: [
            {
                index: string;
                name: string;
                url: string;
            }
        ]
        proficiency_choices: [
            {
                choose: number;
                desc: string;
            }
        ]
        saving_throws: [
            {
                index: string;
                name: string;
                url: string;
            }
        ]
        spellcasting?: {
            info: [{
                name: string;
                desc: string[];
            }];
            level: number;
            spellcasting_ability: {
                index: string;
                name: string;
                url: string;
            }
        }
        spells?: string;
        starting_equipment?: [
            {
                equipment: {
                    index: string;
                    name: string;
                    url: string;
                }
                quantity: number;
            }
        ]
        starting_equipment_options: [
            {
                choose: number;
                desc: string;
                from: {
                    option_set_type: string;
                    options: [
                        {
                            items: [
                                {
                                    choice: number;
                                    desc: string;
                                    from: {
                                        equipment_category: {
                                            name: string;
                                            index: string;
                                            url: string;
                                        }
                                        option_set_type: string;
                                    }
                                    type: string;
                                }
                            ]
                            option_type: string;
                        }
                    ]
                }
                type: string;
            }
        ]
        subclasses?: [
            {
                index: string;
                name: string;
                url: string;
            }
        ]
        url: string;
    }
}
export type RaceProps = {
    desc: string;
    raceData: {
        ability_bonus_options?: {
            choose: number
            from: {
                option_set_type: string
                options: [
                    {
                        ability_score: {
                            index: string
                            name: string
                            url: string
                        }
                        bonus: number
                        option_type: string
                    }
                ]
                type: string
            }
            type: string
        }
        ability_bonuses: [
            {
                ability_score: {
                    index: string;
                    name: string;
                    url: string;
                }
                bonus: number;
            }
        ]
        age: string;
        alignment: string;
        index: string;
        language_desc: string;
        language_options?: {
            choose: number
            from: {
                option_set_type: string;
                options: [
                    {
                        item: {
                            index: string;
                            name: string;
                            url: string;
                        }
                        option_type: string
                    }
                ]
            }
            type: string
        }
        languages: [
            {
                index: string;
                name: string;
                url: string;
            }
        ]
        name: string;
        size: string;
        size_description: string;
        speed: number;
        starting_proficiencies: [
            {
                index: string;
                name: string;
                url: string;
            }
        ]
        starting_proficiency_options: {
            choose: number;
            desc: string;
            from: {
                option_set_type: string;
                options: [
                    {
                        item: {
                            index: string;
                            name: string;
                            url: string;
                        }
                        option_type: string;
                    }
                ]
            }
            type: string;
        }
        subraces: [
            {
                index: string;
                name: string;
                url: string;
            }
        ]
        traits: [
            {
                index: string;
                name: string;
                url: string;
            }
        ]
        url: string;
    }

}

export interface RaceDataProps {
    ability_bonuses: [
        {
            ability_score: {
                index: string;
                name: string;
                url: string;
            }
            bonus: number;
        }
    ]
    age: string;
    alignment: string;
    index: string;
    language_desc: string;
    languages: [
        {
            index: string;
            name: string;
            url: string;
        }
    ]
    name: string;
    size: string;
    size_description: string;
    speed: number;
    starting_proficiencies: [
        {
            index: string;
            name: string;
            url: string;
        }
    ]
    starting_proficiency_options: {
        choose: number;
        desc: string;
        from: {
            option_set_type: string;
            options: [
                {
                    item: {
                        index: string;
                        name: string;
                        url: string;
                    }
                    option_type: string;
                }
            ]
        }
        type: string;
    }
    subraces: [
        {
            index: string;
            name: string;
            url: string;
        }
    ]
    traits: [
        {
            index: string;
            name: string;
            url: string;
        }
    ]
    url: string;
}