const {getAllLaunches,
    addNewLaunch,
    existsLaunchWithId,
    abortLaunchById
} = require('../../models/launches.model')

function httpGetAllLaunches(req,res){

    return res.status(200).json(getAllLaunches());

}

function httpAddNewLaunch(req, res) {
    console.log('Incoming POST /launches request:', req.body);

    const launch = req.body;

    if(!launch.mission || !launch.rocket || !launch.launchDate || !launch.destination){
        return res.status(400).json({
            error: 'Missing required launch property'
        })
    }
    launch.launchDate = new Date(launch.launchDate);
    if(isNaN(launch.launchDate)){
        return res.status(400).json({
            error: 'Invalid Launch Date',
        });
    }
    addNewLaunch(launch);
    
    return res.status(201).json(launch);
}

function httpAbortLaunch(req,res){
    console.log("launchId")
    const launchId = Number(req.params.id);
    if(!existsLaunchWithId(launchId)){
    return res.status(404).json({
        error: 'Launch not Found'
    })
}
    const aborted = abortLaunchById(launchId)
    return res.status(200).json(aborted)

}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch
}