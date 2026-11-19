window.loadTable = (json) => {
    let jsonData = JSON.parse(json); 
    let rawData = jsonData.response.data; // Ensure correct data structure
    
    function renderTable(data) {
        const tbody = document.getElementById("reportBody");
        if (!tbody) {
            console.error("Table body not found");
            return;
        }
        tbody.innerHTML = "";
        data.forEach(record => {
            const row = `<tr>
                <td>${record.fieldData.Contact || "N/A"}</td>
                <td>${record.fieldData.Certification || "N/A"}</td>
                <td>${record.fieldData.Description || "N/A"}</td>
                <td>${record.fieldData.Date || "N/A"}</td>
                <td>${record.fieldData.Type || "N/A"}</td>
                <td>${record.fieldData.FileName || "N/A"}</td>
            </tr>`;
            tbody.innerHTML += row;
        });
    }

    function filterTable() {
        let filteredData = [...rawData]; // Ensure we are not mutating the original dataset
        const contact = document.getElementById("contactFilter").value.toLowerCase();
        const certification = document.getElementById("certificationFilter").value.toLowerCase();
        const description = document.getElementById("descriptionFilter").value.toLowerCase();
        const type = document.getElementById("typeFilter").value.toLowerCase();
        const fileName = document.getElementById("fileNameFilter").value.toLowerCase();
        const startDateInput = document.getElementById("startDate").value;
        const endDateInput = document.getElementById("endDate").value;
        
        const startDate = startDateInput ? new Date(startDateInput) : null;
        const endDate = endDateInput ? new Date(endDateInput) : null;

        filteredData = filteredData.filter(record => {
            const recordDate = record.fieldData.Date ? new Date(record.fieldData.Date) : null;

            return (
                (contact === "" || record.fieldData.Contact?.toLowerCase().includes(contact)) &&
                (certification === "" || record.fieldData.Certification?.toLowerCase().includes(certification)) &&
                (description === "" || record.fieldData.Description?.toLowerCase().includes(description)) &&
                (type === "" || record.fieldData.Type?.toLowerCase().includes(type)) &&
                (fileName === "" || record.fieldData.FileName?.toLowerCase().includes(fileName)) &&
                (!startDate || !recordDate || recordDate >= startDate) &&
                (!endDate || !recordDate || recordDate <= endDate)
            );
        });

        renderTable(filteredData);
    }

    document.getElementById("contactFilter")?.addEventListener("input", filterTable);
    document.getElementById("certificationFilter")?.addEventListener("input", filterTable);
    document.getElementById("descriptionFilter")?.addEventListener("input", filterTable);
    document.getElementById("typeFilter")?.addEventListener("input", filterTable);
    document.getElementById("fileNameFilter")?.addEventListener("input", filterTable);
    document.getElementById("startDate")?.addEventListener("change", filterTable);
    document.getElementById("endDate")?.addEventListener("change", filterTable);

    // Render initial table
    renderTable(rawData);
};
