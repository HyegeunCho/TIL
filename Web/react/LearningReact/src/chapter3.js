function currying() {
    const userLogs = userName => message => console.log(`${userName} -> ${message}`);
    const log = usrLog('grandpa23');

    log('attempted to load 20 fake members');
    getFakeMembers(20).then(
        members => log(`successfully loaded ${members.length} members`),
        error => log(`encountered an error loading members`)
    )

}