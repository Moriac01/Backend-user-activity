export class Publication {
    constructor(
        public id: string,
        public title: string,
        public content: string,
        public authorId: string,
        public createdAt: Date = new Date(),
        public updatedAt: Date = new Date(),
    ) {}
}

export interface PublicationRepository {
    create(pub: Publication): Promise<void>;
    update(pub: Publication): Promise<void>
    findById(pubId: string): Promise<Publication | null>;
    delete(pubId: string): Promise<void>;
    getAll(): Promise<Publication[]>;
}