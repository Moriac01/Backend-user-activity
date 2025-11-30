import { Publication, type PublicationRepository } from "./publication.entity";

export class PublicationService {
    constructor(private repository: PublicationRepository) {}

    async createPublication(pub: Publication): Promise<void> {
        await this.repository.create(pub);
    }

    async updatePublication(pub: Publication): Promise<void> {
        await this.repository.update(pub);
    }

    async getPublicationById(pubId: string): Promise<Publication | null> {
        return this.repository.findById(pubId);
    }

    async deletePublication(pubId: string): Promise<void> {
        await this.repository.delete(pubId);
    }

    async listAll(): Promise<Publication[]> {
        return this.repository.getAll();
    }
}
