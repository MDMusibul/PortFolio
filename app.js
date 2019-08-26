// DOM elements
const time = document.getElementById('time'),
      greeting = document.getElementById('greeting');

// Show the time
function showTime() {
    let today = new Date(),
        hour = today.getHours(),
        min = today.getMinutes();
        // sec = today.getSeconds;

    // Set AM or PM
    const amPm = hour >= 12 ? 'PM' : 'AM';

    //  12hr Format
    hour = hour % 12 || 12;

    // Output
    time.innerHTML = `${addZero(hour)}<span>:</span>${addZero(min)}`;

    setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Greeting
function setGreeting() {
    let today = new Date(),
        hour = today.getHours();
    
    if(hour < 12) {
        // Morning
        greeting.textContent = 'Good Morning';
    } else if(hour < 15) {
        // Afternoon
        greeting.textContent = 'Good Afternoon';
    } else {
        // Evening
        greeting.textContent = 'Good Evening';
    }
}

// RUN
showTime();
setGreeting();



// tabbing


const tabItems = document.querySelectorAll('.tab-item'),
      tabContentItems = document.querySelectorAll('.tab-content-item');

// Select tab content item
function selectItem(e) {
    removeBorder();
    removeShow();
    // Add  border to current tab
    this.classList.add('tab-border');
    // Grab content item from DOM
    const tabContentItem = document.querySelector(`#${this.id}-content`);
    // Add show class
    tabContentItem.classList.add('show');
}

function removeBorder(){
    tabItems.forEach(item => item.classList.remove('tab-border'));
}
function removeShow(){
    tabContentItems.forEach(item => item.classList.remove('show'));
}

// Listen for tab click
tabItems.forEach(item => item.addEventListener('click', selectItem));





// page scroll

const indexItem = document.querySelectorAll('.indicator');

// Select tab content item
function selectPosition(e) {
    removeColor();
    // Add  border to current tab
    this.classList.add('current');
}

function removeColor(){
    indexItem.forEach(item => item.classList.remove('current'));
}

// Listen for tab click
indexItem.forEach(item => item.addEventListener('click', selectPosition));
























// Adding opacity
window.addEventListener('scroll', function(){
    if(window.scrollY > 150){
        document.querySelector('#main-nav').style.opacity = 0.9;
    }else{
        document.querySelector('#main-nav').style.opacity = 1;
    }
});

// JQuery CDN
$('#main-nav a').on('click', function(e){
    if(this.hash !== ''){
        e.preventDefault();

        const hash = this.hash;

        $('html, body').animate({
            scrollTop: $(hash).offset().top - 62
        }, 800);
    }
});

$('#showcase .scroll-key a').on('click', function(e){
    if(this.hash !== ''){
        e.preventDefault();

        const hash = this.hash;

        $('html, body').animate({
            scrollTop: $(hash).offset().top - 63
        }, 800);
    }
});


















// Maps
function initMap(){
    // Map options
    var options = {
      zoom:8,
      center:{lat: 22.572645, lng:88.363892}
    }

    // New map
    var map = new google.maps.Map(document.getElementById('map'), options);

    // Listen for click on map
    google.maps.event.addListener(map, 'click', function(event){
      // Add marker
      addMarker({coords:event.latLng});
    });

    // Array of markers
    var markers = [
    //   {
    //     coords:{lat:42.4668,lng:-70.9495},
    //     iconImage:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    //     content:'<h1>Lynn MA</h1>'
    //   },
      {
        coords:{lat: 22.560792, lng: 88.413279},
        content:'<h1>Amesbury MA</h1>'
      }
    //   {
    //     coords:{lat:42.7762,lng:-71.0773}
    //   }
    ];

    // Loop through markers
    for(var i = 0;i < markers.length;i++){
      // Add marker
      addMarker(markers[i]);
    }

    // Add Marker Function
    function addMarker(props){
      var marker = new google.maps.Marker({
        position:props.coords,
        map:map,
        //icon:props.iconImage
      });

      // Check for customicon
      if(props.iconImage){
        // Set icon image
        marker.setIcon(props.iconImage);
      }

      // Check content
      if(props.content){
        var infoWindow = new google.maps.InfoWindow({
          content:props.content
        });

        marker.addListener('click', function(){
          infoWindow.open(map, marker);
        });
      }
    }
  }
