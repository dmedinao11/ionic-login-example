export class AvatarItemModel{
    constructor(
        public id: number,
        public imgURL: string,
        public checkBoxId: string,
        public checked?: boolean
    ) {}
}