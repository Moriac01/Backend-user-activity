export class Favorite {
    constructor (
        public id: string,
        public userId: string,
        public publicationId: string,
        public createdAt: Date = new Date()
    ) {}
}

export interface FavoriteRepository {
    add(fav: Favorite): Promise<void>;
    remove(favoritId: string, publicationId: string): Promise<void>;
    findByUser(userId: string): Promise<Favorite[]>;
    isFavorite(userId: string, publicationId: string): Promise<boolean>;
}