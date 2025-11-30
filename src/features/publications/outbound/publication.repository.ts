import { Publication, type PublicationRepository } from "../domain/publication.entity";


export class SimplePublicationRepository implements PublicationRepository {
    private publications: Publication[] = [];

    async create (pub: Publication): Promise<void> {
        this.publications.push(pub);
    }

    async update (pub: Publication): Promise<void> {
        const index = this.publications.findIndex(p => p.id === pub.id)
        if (index !== -1) {
            this.publications[index] = pub;
        }

    }

    async findById(pubId: string): Promise<Publication | null> {
        return this.publications.find(p => p.id === pubId) || null;
    }

    async delete(pubId: string): Promise<void> {
        this.publications = this.publications.filter(p => p.id === pubId)
    }

    async getAll(): Promise<Publication[]> {
        return this.publications
    }
}