/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial
Software License Agreement provided with the Software or, alternatively, in accordance with the
terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2013-09-18 17:18:59 (940c324ac822b840618a3a8b2b4b873f83a1a9b1)
*/
/**
 * @author Don Griffin
 *
 * This class is a base for all id generators. It also provides lookup of id generators by
 * their id.
 * 
 * Generally, id generators are used to generate a primary key for new model instances. There
 * are different approaches to solving this problem, so this mechanism has both simple use
 * cases and is open to custom implementations. A {@link Ext.data.Model} requests id generation
 * using the {@link Ext.data.Model#idgen} property.
 *
 * # Identity, Type and Shared IdGenerators
 *
 * It is often desirable to share IdGenerators to ensure uniqueness or common configuration.
 * This is done by giving IdGenerator instances an id property by which they can be looked
 * up using the {@link #get} method. To configure two {@link Ext.data.Model Model} classes
 * to share one {@link Ext.data.SequentialIdGenerator sequential} id generator, you simply
 * assign them the same id:
 *
 *     Ext.define('MyApp.data.MyModelA', {
 *         extend: 'Ext.data.Model',
 *         idgen: {
 *             type: 'sequential',
 *             id: 'foo'
 *         }
 *     });
 *
 *     Ext.define('MyApp.data.MyModelB', {
 *         extend: 'Ext.data.Model',
 *         idgen: {
 *             type: 'sequential',
 *             id: 'foo'
 *         }
 *     });
 *
 * To make this as simple as possible for generator types that are shared by many (or all)
 * Models, the IdGenerator types (such as 'sequential' or 'uuid') are also reserved as
 * generator id's. This is used by the {@link Ext.data.UuidGenerator} which has an id equal
 * to its type ('uuid'). In other words, the following Models share the same generator:
 *
 *     Ext.define('MyApp.data.MyModelX', {
 *         extend: 'Ext.data.Model',
 *         idgen: 'uuid'
 *     });
 *
 *     Ext.define('MyApp.data.MyModelY', {
 *         extend: 'Ext.data.Model',
 *         idgen: 'uuid'
 *     });
 *
 * This can be overridden (by specifying the id explicitly), but there is no particularly
 * good reason to do so for this generator type.
 *
 * # Creating Custom Generators
 * 
 * An id generator should derive from this class and implement the {@link #generate} method.
 * The constructor will apply config properties on new instances, so a constructor is often
 * not necessary.
 *
 * To register an id generator type, a derived class should provide an `alias` like so:
 *
 *     Ext.define('MyApp.data.CustomIdGenerator', {
 *         extend: 'Ext.data.IdGenerator',
 *         alias: 'idgen.custom',
 *
 *         configProp: 42, // some config property w/default value
 *
 *         generate: function () {
 *             return ... // a new id
 *         }
 *     });
 *
 * Using the custom id generator is then straightforward:
 *
 *     Ext.define('MyApp.data.MyModel', {
 *         extend: 'Ext.data.Model',
 *         idgen: 'custom'
 *     });
 *     // or...
 *
 *     Ext.define('MyApp.data.MyModel', {
 *         extend: 'Ext.data.Model',
 *         idgen: {
 *             type: 'custom',
 *             configProp: value
 *         }
 *     });
 *
 * It is not recommended to mix shared generators with generator configuration. This leads
 * to unpredictable results unless all configurations match (which is also redundant). In
 * such cases, a custom generator with a default id is the best approach.
 *
 *     Ext.define('MyApp.data.CustomIdGenerator', {
 *         extend: 'Ext.data.SequentialIdGenerator',
 *         alias: 'idgen.custom',
 *
 *         id: 'custom', // shared by default
 *
 *         prefix: 'ID_',
 *         seed: 1000
 *     });
 *
 *     Ext.define('MyApp.data.MyModelX', {
 *         extend: 'Ext.data.Model',
 *         idgen: 'custom'
 *     });
 *
 *     Ext.define('MyApp.data.MyModelY', {
 *         extend: 'Ext.data.Model',
 *         idgen: 'custom'
 *     });
 *
 *     // the above models share a generator that produces ID_1000, ID_1001, etc..
 *
 */
Ext.define('Ext.data.IdGenerator', {

    /**
     * @property {Boolean} isGenerator
     * `true` in this class to identify an object as an instantiated IdGenerator, or subclass thereof.
     */
    isGenerator: true,

    /**
     * Initializes a new instance.
     * @param {Object} config (optional) Configuration object to be applied to the new instance.
     */
    constructor: function(config) {
        var me = this;

        Ext.apply(me, config);

        if (me.id) {
            Ext.data.IdGenerator.all[me.id] = me;
        }
    },

    /**
     * @cfg {String} id
     * The id by which to register a new instance. This instance can be found using the
     * {@link Ext.data.IdGenerator#get} static method.
     */

    getRecId: function (rec) {
        return rec.modelName + '-' + rec.internalId;
    },

    /**
     * Generates and returns the next id. This method must be implemented by the derived
     * class.
     *
     * @return {String} The next id.
     * @method generate
     * @abstract
     */

    statics: {
        /**
         * @property {Object} all
         * This object is keyed by id to lookup instances.
         * @private
         * @static
         */
        all: {},

        /**
         * Returns the IdGenerator given its config description.
         * @param {String/Object} config If this parameter is an IdGenerator instance, it is
         * simply returned. If this is a string, it is first used as an id for lookup and
         * then, if there is no match, as a type to create a new instance. This parameter
         * can also be a config object that contains a `type` property (among others) that
         * are used to create and configure the instance.
         * @static
         */
        get: function (config) {
            var generator,
                id,
                type;

            if (typeof config == 'string') {
                id = type = config;
                config = null;
            } else if (config.isGenerator) {
                return config;
            } else {
                id = config.id || config.type;
                type = config.type;
            }

            generator = this.all[id];
            if (!generator) {
                generator = Ext.create('idgen.' + type, config);
            }

            return generator;
        }
    }
});
