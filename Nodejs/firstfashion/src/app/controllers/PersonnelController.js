const Personnel = require('../models/Personnel');
const { multipleMongooseToObject } = require('../../util/mongoose')
const { mongooseToObject } = require('../../util/mongoose');
class PersonnelController {
    index(req, res, next) {
            Promise.all([Personnel.find({}), Personnel.countDocumentsDeleted()])
                .then(([personnels, deleteCount]) =>
                    res.render('personnel', {
                        deleteCount,
                        personnels: multipleMongooseToObject(personnels)
                    }))
                .catch(next)
        }
    detailPersonnel(req, res, next){
        Personnel.findOne({_id: req.params.id})
        .then((person)=>res.render('personnel/detailPersonnel',{
            person:mongooseToObject(person)
            }))
        .catch(next)
        }
    searchPersonnel(req, res, next){
        const namePersonnel = req.query.q;
        var regex = new RegExp(namePersonnel, 'i');
        Promise.all([Personnel.find({fullName:regex}),Personnel.countDocumentsDeleted()])
        .then(([personnels,deleteCount])=>res.render('personnel/searchPersonnel',{
            deleteCount,
            personnels:multipleMongooseToObject(personnels)
        }))
        .catch(next)
    }
    createPersonnel(req, res, next) {
        res.render('personnel/createPersonnel')
    }
    storePersonnel(req, res, next) {
        req.body.image = req.file.path.split('\\').slice(4).join('\\');
        const personnel = new Personnel(req.body);
        personnel.save()
            .then(() => res.redirect('/personnel'))
            .catch(next)
    }
    editPersonnel(req, res, next) {
        Personnel.findById(req.params.id)
            .then((personnel) => res.render('personnel/editPersonnel', {
                personnel: mongooseToObject(personnel)
            }))
            .catch(next)

    }
    updatePersonnel(req, res, next) {
        if(req.file){
            req.body.image = req.file.path.split('\\').slice(4).join('\\');
        }else{
            console.log('no')
        }
            Personnel.updateOne({ _id: req.params.id }, req.body)
                .then(() => res.redirect('/personnel'))
                .catch(next)
        }
        //soft delete
    deletePersonnel(req, res, next) {
        Personnel.delete({ _id: req.params.id })
            .then(() => res.redirect('/personnel'))
            .catch(next)
    }
    trashPersonnel(req, res, next) {
        Personnel.findDeleted({})
            .then((personnels) => res.render('personnel/trashPersonnel', {
                personnels: multipleMongooseToObject(personnels)
            }))
            .catch(next)
    }
    destroyPersonnel(req, res, next) {
        Personnel.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }
    restorePersonnel(req, res, next) {
        Personnel.restore({ _id: req.params.id })
            .then(() => res.redirect('/personnel'))
            .catch(next)
    }
}

module.exports = new PersonnelController