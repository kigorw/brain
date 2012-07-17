function pubsub($){
  
   var topics = {};
   $.pub = function(topic, data) { 
       var listeners = topics[topic];
       if(!listeners) return;
       for (var i=0; i < listeners.length; i++) {
           listeners[i](data);
       }
   }

   $.sub = function(topic, cb) {
       topics[topic] = topics[topic] || [];
       topics[topic].push(cb);
   } 
   $.unsub = function(topic, cb) {
       var listeners = topics[topic];
       listeners.alerts.splice(listeners.indexOf(cb), 1); 
   }

   return $;

}

pubsub(window);