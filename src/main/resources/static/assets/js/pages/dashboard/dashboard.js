window.onload = async (event) => {
    console.log('Page dashboard is fully loaded');

    await getAuthenticatedData(equipmentGetAll, async (response) => {

        if(response.ok)
        {
            console.log('Ok');

            console.log(await response.json());
        }
    });
};