import RegionsPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions";
import Wavesurfer from "wavesurfer.js";
import TimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline";
//import CursorPlugin from "wavesurfer.js/src/plugin/cursor";
/**
 * @typedef {Object} regions
 * @property {string} id
 * @property {number} start
 * @property {number} end
 * @property {boolean} drag
 * @property {boolean} loop
 * @property {boolean} resize
 */

/**
 * This is the module containing wavesurfer object and its custom methods for annotator tool
 *
 * ## access wavesurfer
 *
 * ### ` trimmer Mode `
 *  bot -> `bot-id`
 *
 *  customer -> `customer-id`
 *
 *  trimmer -> `trimmer-id`
 *
 * ### `edit Mode `
 *
 * bot -> `bot-id`
 *
 * customer -> `customer-id`
 *
 * `no trimmer`
 *
 *
 * @example
 * const waveObj=new wavekiller(waveContainerRef.current,timeLineContainer.current,color="green")
 *
 *
 * @property {function} updateRegions Used for resetting regions
 */
class WaveKiller {
  /**
   * wavesurfer obj
   *
   */
  obj;
  /**
   *@type {regions} regions
   */
  regions = [];
  maxTime = 0;
  editChunk = { start: null, end: null };
  /**
   * initiate the waveform
   */
  constructor(
    waveformContainer,
    timeLineContainer,
    barGap = 0.8,
    barWidth = 1.2,
    color = getComputedStyle(document.querySelector(":root")).getPropertyValue(
      "--wave-color"
    )
      ? getComputedStyle(document.querySelector(":root")).getPropertyValue(
          "--wave-color"
        )
      : "#5ff5b7"
  ) {
    this.obj = Wavesurfer.create({
      container: waveformContainer,
      autoCenter: true,
      cursorColor: "#9E9E9E",
      waveColor: color,
      responsive: true,
      dragSelection: false,
      progressColor: color,
      normalize: true,
      // barWidth,
      // barGap,
      plugins: [
        TimelinePlugin.create({
          container: timeLineContainer,
        }),
        RegionsPlugin.create({}),
      ],
    });

    return this;
  }
  destroy() {
    this.obj.destroy();
  }
  /**
   * Load the audio waveform
   */
  load(url) {
    this.obj.load(url);
  }
  pause() {
    this.obj.pause();
  }
  /**
   * use this to create new regions and also adding trimmer in non edit mode
   * @param {{id:string,start:number ,end:number,speaker:"customer"|"bot"}[]} regions
   */
  async renderRegions(regions) {
    await this.setMaxTime(regions);
    this.obj.clearRegions();
    this.regions.forEach((e) => {
      this.obj.addRegion({
        id: e.speaker + "-" + e.id,
        start: e.start,
        end: e.end,
        loop: false,
        drag: false,
        resize: false,
      });
      //  console.log(e, "logging regions");
    });
    this.obj.addRegion({
      id: "trimmer",
      start: this.maxTime,
      end: this.maxTime + 2,
      loop: false,
    });
    this.obj.on("region-updated", (e) => {
      const [start, end, id] = [e.start, e.end, e.id];
      const length = end - start;
      if (id === "trimmer" && start < this.maxTime) {
        // e.start = this.maxTime + 0.5;
        // e.end = this.maxTime + length + 0.5;
      }
    });
    this.obj.on("region-mouseenter", (e) => {
      // console.log("region-updated", e.id.split("-")[0]);
      if (e.id !== "trimmer") {
        const span = document.querySelector("#tagger");
        span.style.display = "inline";
        span.innerText =
          e.id.split("-")[0] === "edit"
            ? e.id.split("-")[1]
            : e.id.split("-")[0] === "bot"
            ? "AI-Agent"
            : "Customer";
        span.style.left =
          parseInt(
            document.getElementById("waveform").getBoundingClientRect().left
          ) +
          Math.floor(parseInt(e.element.style.width.slice(0, -2)) / 2) +
          parseInt(e.element.style.left.slice(0, -2)) +
          "px";
      }
      // e.color="rgba(128,128,128,0.1)"
    });
    this.obj.on("region-mouseleave", (e) => {
      const element = document.querySelector("#tagger");
      if (element) {
        element.style.display = "none";
      }
      if (e.id != "trimmer") {
        // e.color="rgba(128,128,128,0)"
      }
    });

    this.obj.on("region-click", (reg) => {
      let regi = document.getElementById(reg.id.split("-")[1]);
      if (regi) {
        regi.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
        regi.classList.add("shadow-sdisw9282");
        setTimeout(() => {
          regi.classList.remove("shadow-sdisw9282");
        }, 1000);
      }
    });
  }
  /**
   * this will remove the trimmer and and set the current region `id` as a new trimmer
   * @param {string} id
   */
  async renderEditRegions(id) {
    const regions = this.obj.regions.list;

    let [start, end, currentId] = [0, 0, ""];
    for (let i in regions) {
      if (regions[i].id.includes(id)) {
        [start, end, currentId] = [
          regions[i].start,
          regions[i].end,
          regions[i].id,
        ];
        regions[i].remove();
      }
    }
    regions["trimmer"]?.remove();
    this.obj.addRegion({
      id: "edit" + "-" + currentId,
      start: start,
      end: end,
      resize: true,
      drag: false,
      loop: false, // add loop here
    });
    //  const[left,right]=this.getBoundingTime(id)
    //   this.obj.on("region-updated", (e) => {
    //     // console.log(boundingStart, boundingEnd);
    //     if (e.id.includes(id)) {
    //       if (e.start <= left) {
    //         e.start = left + 0.01;
    //       }
    //       if (e.end >= right) {
    //         e.end = right - 0.01;
    //       }
    //     }
    //   });
  }
  /**
   *
   * @param {[regions]} regions
   * @returns
   */
  resetEditChunkSpeaker(speaker, id) {
    const regions = this.obj.regions.list;

    let [start, end, currentId] = [0, 0, `edit-${speaker}-${id}`];
    for (let i in regions) {
      if (regions[i].id.includes(id)) {
        [start, end] = [regions[i].start, regions[i].end];
        regions[i].remove();
        break;
      }
    }
    this.obj.addRegion({
      start,
      end,
      id: currentId,
    });
  }
  setMaxTime(regions, user) {
    const newThis = this;
    return new Promise(function (resolve) {
      newThis.regions = regions;
      regions.forEach((e) => {
        if (e.id.includes(user)) {
          newThis.maxTime = Math.max(newThis.maxTime, e.end);
        }
      });
      resolve();
    });
  }
  /**
   * it returns the current start and end time of regions
   * @param {string} id
   * @returns {[number,number]} returns startTime and endTime
   */
  getRegionTime(id) {
    const regions = this.obj.regions.list;
    for (let i in regions) {
      if (regions[i].id.includes(id)) {
        return [regions[i].start, regions[i].end];
      }
    }
  }
  /**
   * currently
   * @param {string} id
   * @returns
   */
  getBoundingTime(id) {
    const regions = this.obj.regions.list;
    let [left, right] = [0, this.obj.getDuration()];
    let speaker;
    let start, end;
    for (let i in regions) {
      if (regions[i].id.includes(id)) {
        start = regions[i].start;
        end = regions[i].end;
        speaker = regions[i].id.includes("bot")
          ? "bot"
          : regions[i].id.includes("customer")
          ? "customer"
          : "none";
      }
    }
    //console.log(start, end, "this is start end");

    for (let i in regions) {
      if (!regions[i].id.includes(id)) {
        if (regions[i].id.includes(speaker)) {
          if (start >= regions[i].end) {
            left = Math.max(left, regions[i].end);
          }
          if (end <= regions[i].start) {
            right = Math.min(right, regions[i].start);
          }
        }
      }
    }
    //console.log(left, right, "left right");
    return [left, right];
  }
  playPause() {
    this.obj.playPause();
  }
  /**
   *
   * @param {number} e [0..1]
   */
  setVolume(e) {
    this.obj.setVolume(e);
  }
  stop() {
    this.obj.stop();
  }
  play() {
    this.obj.play();
  }
  removeLoopAllRegions() {
    const regions = this.obj.regions.list;
    for (let i in regions) {
      regions[i].loop = false;
    }
  }
  playRegion(id) {
    const regions = this.obj.regions.list;
    for (let i in regions) {
      if (regions[i].id.includes(id)) {
        // this.obj.pause();
        regions[i].playLoop();
      } else {
        regions[i].loop = false;
      }
    }
  }
  zoom(e) {
    this.obj.zoom(e);
  }
  speed(e) {
    this.obj.setPlaybackRate(e);
  }
}

export default WaveKiller;
