/*
 * --------------------------------------------------
 * MNKR_ChangeActorImages.js
 *   Ver.0.0.2
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_RandomActorName.js
 * @plugindesc 「アクターの画像変更」の指定アクターを変数値の挙動に変更します。
 * @author munokura
 *
 * @help
 * イベントコマンド「アクターの画像変更」の指定アクターを無視し、
 * 指定アクターIDを変数値の挙動に変更します。
 *
 *
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 * 
 * 
 * @param raiseSwitch
 * @text 有効化スイッチ
 * @desc 指定スイッチがONの時、このプラグインを動作させます。0の場合、常に動作します。
 * @type switch
 * @default 0
 * 
 * @param actorIdVariableId
 * @text アクターID変数
 * @desc 「アクターの画像変更」の対象になるアクターIDを入れる変数
 * @type variable
 * @default 0
 */

(() => {
    "use strict";

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const pluginParameters = PluginManager.parameters(pluginName);
    const PRM_raiseSwitch = Number(pluginParameters['raiseSwitch'] || 0);
    const PRM_actorIdVariableId = Number(pluginParameters['actorIdVariableId'] || 0);

    // Change Actor Images
    const _Game_Interpreter_command322 = Game_Interpreter.prototype.command322;
    Game_Interpreter.prototype.command322 = function () {
        const raise = PRM_raiseSwitch === 0 ? true : $gameSwitches.value(PRM_raiseSwitch);
        if (raise) {
            const actor = $gameActors.actor($gameVariables.value(PRM_actorIdVariableId));
            if (actor) {
                actor.setCharacterImage(this._params[1], this._params[2]);
                actor.setFaceImage(this._params[3], this._params[4]);
                actor.setBattlerImage(this._params[5]);
            }
            $gamePlayer.refresh();
            return true;
        } else {
            return _Game_Interpreter_command322.call(this);
        };
    };

})();
