'use strict'

const shipModel = new Ship() // eslint-disable-line no-undef

function initAddForm () {
    const form = window.document.querySelector('#ship-add-form')
    form.addEventListener('submit', function (e) {
        e.preventDefault()

        const formData = new FormData(e.target)
        const shipData = {}
        formData.forEach((value, key) => {
            shipData[key] = value
        })

        let hiddenInput = document.getElementById('update-item');
        if(hiddenInput.value) {
            shipModel.Update(shipData);
            let createButton = document.getElementById('btn-create');
            let updateButton = document.getElementById('btn-update');
            createButton.classList.remove('btn-hidden');
            updateButton.classList.add('btn-hidden');
            let hiddenInput = document.getElementById('update-item');
            hiddenInput.value = '';
        }
        else {
            shipModel.Create(shipData);
        }

        e.target.reset()
    })
}

function initList () {
    window.jQuery('#ship-list').DataTable({
        data: shipModel.Select(),
        columns: [
            { title: 'ID', data: 'id' },
            { title: 'Name', data: 'name' },
            { title: 'Country', data: 'country' },
            { title: 'Tonnage', data: 'tonnage' },
            { title: 'Action', data: '' }
        ],
        columnDefs: [
            {
                "render": function(data, type, row) {
                    return ''
                        + '<button type="button" value="delete" onclick="deleteItem(this)">Delete</button>'
                        + "\n"
                        + '<button type="button" value="update" onclick="updateItem(this)">Update</button>';
                },
                "targets": 4
            }
        ]
    })
}

function initListEvents () {
    document.addEventListener('shipsListDataChanged', function (e) {
        const dataTable = window.jQuery('#ship-list').DataTable()

        dataTable.clear()
        dataTable.rows.add(e.detail)
        dataTable.draw()
    }, false)
}

function deleteItem(e) {
    let row = e.parentNode.parentNode;
    let id = row.getElementsByTagName('td')[0].innerText;
    row.remove();
    shipModel.Delete(id);
}

function updateItem(e) {
    let row = e.parentNode.parentNode;
    let id = row.getElementsByTagName('td')[0].innerText;
    let obj = shipModel.FindById(parseInt(id));
    document.getElementById('name').value = obj.name;
    document.getElementById('country').value = obj.country;
    document.getElementById('tonnage').value = obj.tonnage;
    let createButton = document.getElementById('btn-create');
    let updateButton = document.getElementById('btn-update');
    createButton.classList.add('btn-hidden');
    updateButton.classList.remove('btn-hidden');
    let hiddenInput = document.getElementById('update-item');
    hiddenInput.value = obj.id;
}

window.addEventListener('DOMContentLoaded', e => {
    initAddForm()
    initList()
    initListEvents()
})
