class AudioApi {
	static MIN_FREQUENCY = 200
	static MAX_FREQUENCY = 2000
	static MIN_VOLUME = 0;
	static MAX_VOLUME = 1;

	context
	volume
	oscillator
	playing

	baseFrequency = .5
	baseVolume = .5

	constructor() {
		this.context = new window.AudioContext()
		this.oscillator = this.context.createOscillator()
		this.volume = this.context.createGain()
		this.playing = this.context.createGain()

		this.oscillator.connect(this.playing)
		this.playing.connect(this.volume)
		this.volume.connect(this.context.destination)
	}

	setVolume(newVolume) {
		this.volume.gain.setTargetAtTime(
			this.getBetweenValue(this.baseVolume, AudioApi.MIN_VOLUME, AudioApi.MAX_VOLUME) * newVolume,
			this.time,
			.01
		)
	}

	setFrequency(newFrequency) {
		this.oscillator.frequency.setTargetAtTime(
			this.getBetweenValue(this.baseFrequency, AudioApi.MIN_FREQUENCY, AudioApi.MAX_FREQUENCY) * newFrequency,
			this.time,
			.01
		);
	}

	setBaseVolume(newBaseVolume) {
		this.baseVolume = parseFloat(newBaseVolume)
	}

	setBaseFrequency(newBaseFrequency) {
		this.baseFrequency = parseFloat(newBaseFrequency)
	}

	getBetweenValue(perc, min, max) {
		return perc * (max - min) + min
	}

	get time() {
		return this.context.currentTime
	}

	play() {
		try {
			this.oscillator.start(this.time);
		} catch { } finally {
			this.playing.gain.setTargetAtTime(1, this.time, .01)
		}
	}

	stop() {
		this.playing.gain.setTargetAtTime(0, this.time, .01)
	}
}
