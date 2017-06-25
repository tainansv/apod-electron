let $ = require('jquery');
let image;

// get the image of the day from NASA
function newImage() {
    $.ajax({url: 'https://api.nasa.gov/planetary/apod?api_key=VRTx71kxKKU0DEQTOEFvVbM9eB0v7nKMhbdiMNlu',
        success: (result) =>{
            image = result;
            $('#title').text(image.title);
            $('#date').text(image.date);
            $('#inner-image').attr('src', image.url);
            $('#cprt').text('Credit & Copyright: ' + image.copyright);
            $('#bt-view').attr('href', image.hdurl);
            $('#text').text(image.explanation);
            $('#inner-image').on("load", () => {
                $('#loader').addClass('hide');
                $('#image').removeClass('hide');
                $('#controls').removeClass('hide');
            })
        }
    });
}

function showExp() {
    $('#explanation').toggleClass('hide');
}

// when the page is loaded, get a quote
$(function(){
    newImage();

    $('#bt-exp').on('click', showExp);
});