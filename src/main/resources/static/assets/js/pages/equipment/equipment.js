function refUpdateEquipment(updateButton)
{
    let equipmentId = updateButton.closest('tr').getAttribute('id');

    let url = new URL(equipmentUpdateHtml);

    url.searchParams.append('equipment-id', equipmentId);

    location.href = url.href;
}