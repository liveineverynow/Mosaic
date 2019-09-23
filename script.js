// Get all the audio elements and build controls for them
var samples = document.querySelectorAll("audio")
for (let i=0; i<samples.length; i++) {
  let sample = samples[i]
  sample.parentNode.appendChild(buildControls(sample))
}

// var to allow seeking for one sample at a time
var seeker = null

// Returns a div containing the audio controls for an <audio> element
function buildControls(sample) {

  // Create the progress div
  let progressBar = document.createElement("div")
  progressBar.classList.add("progress-bar")

  // Create the sample title
  let sampleTitle = document.createElement("h3")
  let title = sample.src.split("/").reduce((a, c) => c)
  sampleTitle.classList.add("sample-title")
  sampleTitle.textContent = title

  // Create the sample time
  let sampleTime = document.createElement("h3")
  sampleTime.classList.add("sample-time")
  if (!sample.duration) {
    sampleTime.textContent = ""
  } else {
    sampleTime.textContent = `${Math.floor(sample.duration / 60)}:${("000" + Math.floor(sample.duration) % 60).slice(-2)}`
  }
  sample.onloadedmetadata = function() {
    sampleTime.textContent = `${Math.floor(sample.duration / 60)}:${("000" + Math.floor(sample.duration) % 60).slice(-2)}`
  }

  // Create the play/pause button
  let playButton = document.createElement("img")
  playButton.classList.add("button")
  playButton.draggable = false;
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

  // Create the return div
  let div = document.createElement("div")
  div.classList.add("sample")

  // Change the background gradient to reflect the percentage of the sample played
  sample.ontimeupdate = function() {
    let percent = (sample.currentTime / sample.duration * 100)
    progressBar.style.backgroundImage = `linear-gradient(to right, #00000022 ${percent}%, #ffffff00 0%)`
  }

  // add the elements to the return div
  div.appendChild(sampleTitle)
  progressBar.appendChild(sampleTime)
  progressBar.appendChild(playButton)
  div.appendChild(progressBar)

  // Seek track when control div is clicked
  progressBar.onmousedown = function(e) {
    seeker = div
    if (e.target.nodeName === "DIV") {
      let percentage = (e.offsetX) / (progressBar.offsetWidth)
      sample.fastSeek(percentage*sample.duration)
      sample.pause()
      playButton.src = "assets/Play-Button.png"
    }
  }

  // Seek track when control div is dragged
  progressBar.onmousemove = function(e) {
    if (e.buttons === 1 && seeker === div && e.target.nodeName === "DIV") {
      let percentage = (e.offsetX) / (progressBar.offsetWidth)
      sample.fastSeek(percentage*sample.duration)
      sample.pause()
      playButton.src = "assets/Play-Button.png"
    }
  }
  return div
}
