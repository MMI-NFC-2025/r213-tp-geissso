import PocketBase from 'pocketbase';

const db = new PocketBase("http://127.0.0.1:8090");

export async function getOffres() {
    try {
        let data = await db.collection('maison').getFullList({
            sort: '-created',
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la liste des maisons', error);
        return [];
    }
}
export async function getImageUrl(record, recordImage) {
    return db.files.getURL(record, recordImage);
}

export async function getOffre(id) {
    try {
        const data = await db.collection('maison').getOne(id);
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la maison', error);
        return null;
    }
}


export async function addOffre(house) {
    try {
        await db.collection('maison').create(house);
        return {
            success: true,
            message: "L'offre a été ajoutée avec succès."
        };
    } catch (error) {
        console.log('Une erreur est survenue en ajoutant la maison', error);
        return {
            success: false,
            message: "Une erreur est survenue lors de l'ajout de l'offre : " + error
        };
    }
}

export async function filterByPrix(minPrix, maxPrix) {
    try {
        const data = await db.collection('maison').getFullList({
            filter: `prix >= ${minPrix} && prix <= ${maxPrix}`,
            sort: '-created',
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en filtrant les maisons', error);
        return [];
    }
}

export async function setFavori(house) {
    await db.collection('maison').update(house.id, {favori: !house.favori});
}

export async function AllAgents() {
    try {
        let data = await db.collection('Agent').getFullList({
            sort: '-created',
        });
        return data;    
    } catch (error) {
        console.log('Une erreur est survenue en lisant la liste des agents', error);
        return [];
    }
}

export async function getAgent(id) {
    try {
        let data = await db.collection('Agent').getOne(id);
        return data;
    } catch (error) {  
        console.log('Une erreur est survenue en lisant l\'agent', error);
        return null;
    }
}

export async function OffresByAgent(agentId) {
    try {
        let data = await db.collection('maison').getFullList({
            filter: `agent = "${agentId}"`,
            sort: '-created',
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant les maisons de l\'agent', error);
        return [];
    }
}
