import { Favorite, type FavoriteRepository } from "./favorite.entity"

export class FavoriteService {
    constructor(private repository: FavoriteRepository) {}

    async addFavorite(fav: Favorite): Promise<void> {
        await this.repository.add(fav)
    }

    async removeFavorite(favoriteId: string, publicationId: string): Promise<void> {
        await this.repository.remove(favoriteId, publicationId)
    }

    async getFavoritesByUser(userId: string): Promise<Favorite[]> {
        return this.repository.findByUser(userId)
    }

    async isFavorite(userId: string, publicationId: string): Promise<boolean> {
        return this.repository.isFavorite(userId, publicationId)
    }
}
