import { SimpleFavoriteRepository } from '../favorite.repository'
import { Favorite } from '../../domain/favorite.entity'

describe('SimpleFavoriteRepository', () => {
    let repository: SimpleFavoriteRepository

    beforeEach(() => {
        repository = new SimpleFavoriteRepository()
    })

    const createTestFavorite = (id: string = '1'): Favorite => ({
        id,
        userId: 'user1',
        publicationId: 'pub1',
        createdAt: new Date()
    })

    it('should add a favorite', async () => {
        const favorite = createTestFavorite()
        await repository.add(favorite)
        const isFavorite = await repository.isFavorite(favorite.userId, favorite.publicationId)
        expect(isFavorite).toBe(true)
    })

    it('should prevent duplicate favorites', async () => {
        const favorite = createTestFavorite()
        await repository.add(favorite)
        await repository.add(favorite) // Try to add the same favorite again
        
        const userFavorites = await repository.findByUser(favorite.userId)
        expect(userFavorites.length).toBe(1) // Should still only have one favorite
    })

    it('should remove a favorite', async () => {
        const favorite = createTestFavorite()
        await repository.add(favorite)
        await repository.remove(favorite.id, favorite.publicationId)
        
        const isFavorite = await repository.isFavorite(favorite.userId, favorite.publicationId)
        expect(isFavorite).toBe(false)
    })

    it('should return immutable copies from findByUser', async () => {
        const favorite = createTestFavorite()
        await repository.add(favorite)
        const userFavorites = await repository.findByUser(favorite.userId)
        
        // Ensure we have results
        expect(userFavorites.length).toBeGreaterThan(0)
        
        // Modify the returned favorite
    const firstFavorite = userFavorites[0]!
    firstFavorite.id = 'modified'
        
        // Get favorites again
        const newUserFavorites = await repository.findByUser(favorite.userId)
        expect(newUserFavorites[0]?.id).toBe('1') // Original should be unchanged
    })
})