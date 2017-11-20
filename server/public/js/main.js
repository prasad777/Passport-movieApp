$(document).ready(function(){
    $('#fav').on('click',function(f){
        f.preventDefault();
        $.ajax({
            type: 'GET',
            url: '/movie/view'})
            .done(function(data){
                display(data.dataResult,'showFav');
            });
        });     // show all fav movies      
    

    $('#search-btn').on('click',function(s){
        s.preventDefault();
        var searchText = $('#search-txt').val();
        $.ajax({
            type:'GET',
            url:'/movie/search/' + searchText,
            dataType: 'json'})
            .done(function(data){
                display(data.dataResult,'showSearch');
                     }); // search movie 
    });


    });


$(document).on('click','#addFav',function(e){
    e.preventDefault();
    let obj = {};
    let row = $(this).closest('tr');
    obj.title = row.find('td:eq(1)').text();
    obj.poster = '/' + row.find('td:eq(2)').children('img').attr('src').split('/').pop();
    obj.releaseDate = row.find('td:eq(3)').text();
    let $thisInput = $(this);
    $.ajax({
        type:'POST',
        url: '/movie/add',
        dataType: 'json',
        data : obj })
        .done(function(data){
            // if (data.success == false) {
            //     alert('Movie already in fav');
            // }
            $thisInput.closest('tr').addClass('addrow');
        })
    }); // add to fav list

$(document).on('click','#deleteFav', function(e){
    e.preventDefault();
    let row = $(this).closest('tr');
    let id = row.find('td:eq(0)').attr('id');
    let $thisInput = $(this);
    $.ajax({
        type: 'DELETE',
        url: '/movie/' + id ,
        dataType: 'json' })
        .done(function(data){
            $thisInput.closest('tr').remove();
        })
}) // delete ajax call 


// function to display on page.
function display(data,displayFlag){
    let jdata = data;
    let col = [];
    if ( displayFlag === 'showSearch') {
     col = ['#','Title','Poster','Relese Date','Add Favorite'];
    } else {
      col = ['#','Title','Poster','Relese Date','Remove Movie'];
    }
    let table = document.createElement("table");
    $(table).addClass( "table table-bordered table-hover " );
    let tr = table.insertRow(-1);                  
          for (let i = 0; i < col.length; i++) {
              let th = document.createElement("th");      
              th.innerHTML = col[i];
              tr.appendChild(th);
          }
          for (let i = 0; i < jdata.length; i++) {
              tr = table.insertRow(-1);
              tr.id = i ;
              let tabCell ;
                  tabCell = tr.insertCell(-1);
                  tabCell.innerHTML = i + 1 ;
                  if(displayFlag === 'showFav') {
                  tabCell.setAttribute('id',jdata[i]._id)
                  }
                  tabCell = tr.insertCell(-1);
                  tabCell.innerHTML = jdata[i].title;
                  tabCell = tr.insertCell(-1);
                  tabCell.innerHTML = '<img src="http://image.tmdb.org/t/p/w92' + jdata[i].poster + '" class="img-rounded" alt="No Image Available !">' ;
                  tabCell = tr.insertCell(-1);
                  tabCell.innerHTML = jdata[i].releaseDate.substr(0,10);
                  if( displayFlag === 'showSearch') {
                    tabCell = tr.insertCell(-1);
                    tabCell.innerHTML = '<a id="addFav" class="btn btn-default"><span  class="glyphicon glyphicon-plus"></span></a>';  
                  } else {
                    tabCell = tr.insertCell(-1);
                    tabCell.innerHTML = '<a id="deleteFav" class="btn btn-default"><span  class="glyphicon glyphicon-minus"></span></a>'; 
                  }                 
          }
                    // render table  in showTable div space.=
                    let divContainer = document.getElementById("showTable");
          divContainer.innerHTML = "";
          divContainer.appendChild(table);
    };

