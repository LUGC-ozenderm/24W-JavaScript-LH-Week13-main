/* Variables
-------------------------------------------------- */
// STEP 1a: Grab the first <dd> element for displaying the battery charging status
const chargeStatus = document.querySelector('#battery dd:nth-of-type(1)');
// STEP 1b: Grab the <output> element inside the second <dd> element for displaying the battery charge level
const chargeLevel = document.querySelector('#battery dd:nth-of-type(2) output');
// STEP 1c: Grab the <progress> element inside the second <dd> element for a more graphical representation of the battery's state of charge (SOC)
const chargeMeter = document.querySelector('#battery dd:nth-of-type(2) progress');

/* Functions
-------------------------------------------------- */
// STEP 3a: Create the updateBatteryStatus() function
function updateBatteryStatus(battery) {
  // STEP 3b: Update the charging status
  chargeStatus.textContent = battery.charging ? 'Charging' : 'Not Charging';
  // STEP 3c: Update the charge level
  chargeLevel.value = Math.floor(battery.level * 100);
  chargeMeter.value = Math.floor(battery.level * 100);

  if(robohash != null){
    robohash.src = `https://robohash.org/${battery.level}percent.png`;
  }
}

// STEP 2a: Using the getBattery() method of the navigator object, 
//create a promise to retrieve the battery information
navigator.getBattery().then(function(battery) {
  // STEP 3e: Call the updateBatteryStatus() function
  updateBatteryStatus(battery);
  battery.addEventListener('chargingchange', function() {
    updateBatteryStatus(battery);
  });
  battery.addEventListener('levelchange', function() {
    updateBatteryStatus(battery);
  });
});


/* This script adapted from the excellent code examples found at https://www.w3.org/TR/battery-status/#examples and https://developer.mozilla.org/en-US/docs/Web/API/Battery_Status_API */