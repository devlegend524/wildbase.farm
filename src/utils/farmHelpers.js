import farms from 'config/farms'

const ARCHIVED_FARMS_START_PID = 139
const ARCHIVED_FARMS_END_PID = 250

const isArchivedPid = (pid) => pid >= ARCHIVED_FARMS_START_PID && pid <= ARCHIVED_FARMS_END_PID

export default isArchivedPid


export const getFarmFromPid = (pid) => {
    const farmsWithPid = farms.filter((farm) => farm.pid === pid)
    return farmsWithPid.length > 0 ? farmsWithPid[0] : null
}