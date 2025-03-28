import { Request, Response } from "express"
import { Prisma, PrismaClient } from '@prisma/client';

const bcrypt = require('bcrypt');
const cors = require('cors');
const express = require('express');
const app = express();
const port = 5000;
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors())

app.post('/register', async (req: Request, res: Response) => {
    const { nom, prenom, email, password } = req.body;

    try {
        const existingUser = await prisma.user.findUnique({ where: { email }});
        if (existingUser) {
            return res.status(400).json({ message: "Cet email est déjà utilisé."});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.create({
            data: {
                nom,
                prenom,
                email,
                password: hashedPassword
            }
        });

        res.status(201).json({ message: "Utilisateur créé avec succès !"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erreur lors de la création de l'utilisateur." });
    }
});

app.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email }});
        if (!user) {
            return res.status(400).json({ message: "Utilisateur non trouvé."});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message:  "Mot de passe incorrect."});
        }

        res.status(200).json({
            message: "Connexion réussie",
            user: {id : user.id, nom: user.nom, prenom: user.prenom, email: user.email, role: user.role }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la connexion."});
    }
});

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`)
});