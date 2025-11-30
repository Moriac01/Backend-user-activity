
import { Favorite, type FavoriteRepository } from "../domain/favorite.entity"

export class SimpleFavoriteRepository implements FavoriteRepository {
    private favorites: Favorite[] = []

    async add(fav: Favorite): Promise<void> {
        const exists = await this.isFavorite(fav.userId, fav.publicationId)
        if (!exists) {
            this.favorites.push(fav)
        }
    }

    async remove(favoriteId: string, publicationId: string): Promise<void> {
        const index = this.favorites.findIndex(
            f => f.id === favoriteId && f.publicationId === publicationId
        )
        if (index !== -1) {
            this.favorites.splice(index, 1)
        }
    }

    async findByUser(userId: string): Promise<Favorite[]> {
        return this.favorites
            .filter(f => f.userId === userId)
            .map(f => ({ ...f }))
    }

    // Retourne true si l'utilisateur a marqué la publication comme favorite
    async isFavorite(userId: string, publicationId: string): Promise<boolean> {
        return this.favorites.some(
            f => f.userId === userId && f.publicationId === publicationId
        )
    }
}