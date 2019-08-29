// Get all the audio elements and build controls for them
var samples = document.querySelectorAll("audio")
for (let i=0; i<samples.length; i++) {
  let sample = samples[i]
  sample.parentNode.appendChild(buildControls(sample))
}

// Returns a div containing the audio controls for an <audio> element
function buildControls(sample) {
  
  // Create the sample title
  let sampleTitle = document.createElement("span")
  let title = sample.src.split("/").reduce((a, c) => c)
  sampleTitle.classList.add("sample-title")
  sampleTitle.textContent = title
  
  // Create the sample time
  let sampleTime = document.createElement("span")
  sampleTime.classList.add("sample-time")
  if (!sample.duration) {
    sampleTime.textContent = "0:00"
  } else {
    sampleTime.textContent = `${Math.floor(sample.duration / 60)}:${Math.floor(sample.duration) % 60}`
  }
  sample.onloadedmetadata = function() {
    sampleTime.textContent = `${Math.floor(sample.duration / 60)}:${Math.floor(sample.duration) % 60}`
  }
  
  // Create the play/pause button
  let playButton = document.createElement("img")
  playButton.classList.add("button")
  playButton.src = "assets/Play-Button.png"
  playButton.onclick = function() {
    if (sample.paused) {
      sample.play()
      playButton.src = "assets/Pause-Button.png"
    } else {
      sample.pause()
      playButton.src = "assets/Play-Button.png"
    }
  }
  
  // Create the download link
  let downloadButton = document.createElement("a")
  downloadButton.href = `samples/${title}`
  downloadButton.setAttribute("download", title)
  downloadButton.classList.add("button")
  let downloadImage = document.createElement("img")
  downloadImage.src = "assets/Download-Button.png"
  downloadButton.appendChild(downloadImage)
  
  // Create the return div
  let div = document.createElement("div")
  div.classList.add("sample")
  
  // Change the background gradient to reflect the percentage of the sample played
  sample.ontimeupdate = function() {
    let percent = (sample.currentTime / sample.duration * 100)
    div.style.backgroundImage = `linear-gradient(to right, #ccc ${percent}%, #fff 0%)`
  }
  
  // add the elements to the return div
  div.appendChild(sampleTitle)
  div.appendChild(playButton)
  div.appendChild(downloadButton)
  div.appendChild(sampleTime)
  return div
}
