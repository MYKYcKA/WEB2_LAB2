'use strict'

const pierModel = new Pier();
const shipModel = new Ship();
const pierShipsModel = new PierShips();

function initAddForm () {
    const form = window.document.querySelector('#pierShips-add-form')

    let selectTagsData = {
        pier: {
            model: pierModel,
            innerText: (item) => item.port +' '+ item.number
        },
        ship: {
            model: shipModel,
            innerText: (item) => item.name
        },
    };

    for (var key in selectTagsData) {
        let selectTag = document.getElementById(key);
        let piersCollection = selectTagsData[key].model.Select();
        piersCollection.forEach(item => {
            let option = document.createElement('option');
            option.value = item.id;
            option.innerText = selectTagsData[key].innerText(item);
            selectTag.appendChild(option);
        });
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault()

        const formData = new FormData(e.target)
        const pierShipsData = {}
        formData.forEach((value, key) => {
            pierShipsData[key] = value
        })

        let hiddenInput = document.getElementById('update-item');
        if(hiddenInput.value) {
            pierShipsModel.Update(pierShipsData);
            let createButton = document.getElementById('btn-create');
            let updateButton = document.getElementById('btn-update');
            createButton.classList.remove('btn-hidden');
            updateButton.classList.add('btn-hidden');
            let hiddenInput = document.getElementById('update-item');
            hiddenInput.value = '';
        }
        else {
            pierShipsModel.Create(pierShipsData);
        }

        e.target.reset()
    })
}

function initList () {
    window.jQuery('#pierShips-list').DataTable({
        data: pierShipsModel.Select(),
        columns: [
            { title: 'ID', data: 'id' },
            { title: 'pier', data: 'pier' },
            { title: 'ship', data: 'ship' },
            { title: 'Action', data: '' }
        ],
        columnDefs: [
            {
                "render": function (data, type, row) {
                    let piers = pierModel.Select();
                    let newPiers = piers.filter(pass => pass.id == data)
                    return newPiers[0].port + ' ' + newPiers[0].number;
                },
                "targets": 1
            },
            {
                "render": function (data, type, row) {
                    let ships = shipModel.Select();
                    let newShips = ships.filter(tick => tick.id == data)
                    return newShips[0].name;
                },
                "targets": 2
            },
            {
                "render": function(data, type, row) {
                    return ''
                        + '<button type="button" value="delete" onclick="deleteItem(this)">Delete</button>'
                        + "\n"
                        + '<button type="button" value="update" onclick="updateItem(this)">Update</button>';
                },
                "targets": 3
            }
        ]
    })
}

function initListEvents () {
    document.addEventListener('pierShipssListDataChanged', function (e) {
        const dataTable = window.jQuery('#pierShips-list').DataTable()

        dataTable.clear()
        dataTable.rows.add(e.detail)
        dataTable.draw()
    }, false)
}

function deleteItem(e) {
    let row = e.parentNode.parentNode;
    let id = row.getElementsByTagName('td')[0].innerText;
    row.remove();
    pierShipsModel.Delete(id);
}

function updateItem(e) {
    let row = e.parentNode.parentNode;
    let id = row.getElementsByTagName('td')[0].innerText;
    let obj = pierShipsModel.FindById(parseInt(id));
    document.getElementById('pier').value = obj.pier;
    document.getElementById('ship').value = obj.ship;
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
