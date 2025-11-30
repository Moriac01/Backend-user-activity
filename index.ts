import express from 'express';
import bodyParser from 'body-parser'
import { SimpleFavoriteRepository } from './src/features/favorites/outbound/favorite.repository'
import { FavoriteService } from './src/features/favorites/domain/favorite.service'
import createFavoriteController from './src/features/favorites/inbound/favorite.controller'
import { SimpleUserRepository } from './src/features/users/outbound/user.repository'
import { UserService } from './src/features/users/domain/user.service'
import createUserController from './src/features/users/inbound/user.controller'

const app = express();
const port = 3000;

app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Mon projet Bun!'))

// Instantiate repositories and services
const favoriteRepo = new SimpleFavoriteRepository()
const favoriteService = new FavoriteService(favoriteRepo)
app.use('/favorites', createFavoriteController(favoriteService))

const userRepo = new SimpleUserRepository()
const userService = new UserService(userRepo)
app.use('/users', createUserController(userService))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// Global error handler (last middleware)
app.use((err: any, req: any, res: any, next: any) => {
  console.error('Unhandled error', err)
  res.status(500).json({ error: String(err?.message ?? err) })
})
