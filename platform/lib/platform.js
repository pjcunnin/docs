/**
 * Copyright 2018 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const signale = require('signale');
const express = require('express');

const config = require('./config.js');
const routers = {
  'whoAmI': require('./routers/whoAmI.js'),
  'pages': require('./routers/pages.js')
};

class Platform {

  constructor() {
    signale.await(`Starting platform with environment ${config.environment} ...`);
    this.server = express();

    this._check();
    this._registerRouters();

    this.server.listen(config.hosts.platform.port, () => {
      signale.success(`amp.dev available on ${config.hosts.platform.scheme}://${config.hosts.platform.host}:${config.hosts.platform.port}!`);
    });
  }

  _check() {
      // TODO: Check (dependening on environment) if all needed files are
      // there and otherwise only vend a static error page
  }

  _registerRouters() {
    this.server.use('/who-am-i', routers.whoAmI);

    // Register the following router at last as it works as a catch-all
    this.server.use(routers.pages);
  }
};

module.exports = Platform;
