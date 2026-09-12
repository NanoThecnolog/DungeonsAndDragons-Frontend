export type DataProps = {
    index: string;
    name: string;
    url: string;
}
export type ClassRaceProps = {
    results: DataProps[];
}
export interface CharProps {
    classes: ClassRaceProps;
    races: ClassRaceProps;
}