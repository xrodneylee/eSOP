var ActivityMonitor = {
		singleton: true,
		ui		 : null,
		runner	 : null,
		task	 : null,
		lastActive: null,
		
		ready	 : false,
		active	 : false,		// 目前是否在啟動狀態, true: 是, false: 否
		verbose	 : false,		// 是否要往console送訊息, true:是, false:否
		interval : (1000 * 1),	// 2秒鐘檢查一次
		maxInactive: (1000 * 60 * 1),	// Timeout時間, 預設一分鐘
		
		init: function(config) {
			if (!config) {config = {}; }
			
			Ext.apply(this, config, {
//				runner: Ext.TaskMgr,
				runner: new Ext.util.TaskRunner(),
				ui: Ext.getBody(),
				task: {
					run: this.monitorUI,
					interval: config.interval || this.interval,
					scope: this
				}
			});
			
			this.ready = true;
		},
		
		isReady: function() {
			return this.ready;
		},

//		isActive: function() {
//			this.active = true;
//		},
//		
//		isInactive: function() {
//			this.active = false;
//		},
		
		isActive: Ext.emptyFn, // 用於返回一個空函數, 便於在程序中創建空函數, 返回function(){}
		isInactive: Ext.emptyFn,
		
		start: function() {
			if (!this.isReady()) {
				this.log('Please run ActivityMonitor.init()');
				return false;
			}
			
			this.ui.on('mousemove', this.captureActivity, this);
			this.ui.on('keydown', this.captureActivity, this);
			
			this.lastActive = new Date();
			this.log('ActivityMonitor has been started.');
			
			this.active = true;
			this.log("active: " + this.active);
			this.runner.start(this.task);
		},
		
		stop: function() {
			if (!this.isReady()) {
				this.log('Please run ActivityMonitor.init()');
				return false;
			}
			
			this.active = false;
			this.runner.stop(this.task);
//			this.lastActive = null;
			
			this.ui.un('mousemove', this.captureActivity);
			this.ui.un('keydown', this.captureActivity);
			
			this.active = false;
			this.log('active: ' + this.active);
			this.log('ActivityMonitor has been stopped.');
		},
		
		captureActivity: function(eventObj, el, eventOptions) {
			this.lastActive = new Date();
		},
		
		monitorUI: function() {
			var now = new Date();
			inactive = (now - this.lastActive);
			if (this.active == false) {
				inactive = 0;
			}
			if (inactive == null) inactive = 0;
			this.log("this active: " + this.active);
			this.log("inactive: " + inactive + "(ms)");
			this.log("lastActive: " + this.lastActive + "(ms)");
			this.log("maxInactive: " + this.maxInactive + "(ms)");
//			if (inactive >= this.maxInactive) {		// 超過規定的閒置時間
//				this.log('MAXIMUM INACTIVE TIME HAS BEEN REACHED');
//				this.stop();	// remove event listeners
//				this.isInactive();
//			}else {	// 目前已閒置的時間
//				var inactiveSec = inactive / 1000;					// 閒置時間(秒)
//				var maxInactiveSec = this.maxInactive / 1000;		// 最大閒置時間(秒)
//				var intervalInactive = maxInactiveSec - inactiveSec;
				doSessionReload();
//			}
		},
		
		log: function(msg) {
			if (this.verbose) {
				window.console.log(msg);
			}
		}
	};