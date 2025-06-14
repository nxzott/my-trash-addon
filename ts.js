import { ModalFormData, ActionFormData } from '@minecraft/server-ui';
import { world, system, EasingType } from '@minecraft/server';
import { undergroundXray } from './undergroundXray.js';
import '@minecraft/server';
export const easeTypes = ["Linear", "InBack", "InBounce", "InCirc", "InCubic", "InElastic", "InExpo", "InOutBack", "InOutBounce", "InOutCirc", "InOutCubic", "InOutElastic", "InOutExpo", "InOutQuad", "InOutQuart", "InOutQuint", "InOutSine", "InQuad", "InQuart", "InQuint", "InSine", "OutBack", "OutBounce", "OutCirc", "OutCubic", "OutElastic", "OutExpo", "OutQuad", "OutQuart", "OutQuint", "OutSine", "Spring"];
export const callbackIds = new Map();
export const moreCamData = new Map();
export const camStateMap = new Map();
function initPlayer(_0x28347d) {
  const _0x93bdd3 = camStateMap.get(_0x28347d.id);
  if (!_0x93bdd3) {
    camStateMap.set(_0x28347d.id, {
      'state': "MoreCamPers"
    });
  }
  const _0x42a48d = moreCamData.get(_0x28347d.id);
  if (!_0x42a48d) {
    moreCamData.set(_0x28347d.id, {
      'leftORrightbool': true,
      'dynTppLocX': -1,
      'cusTppLocX': -1,
      'cusTppLocY': 1.5,
      'cusTppLocZ': -1.8,
      'cusTppEaseTime': 0.3,
      'cusTppEaseType': 0x0,
      'bettTpFEaseType': 0x0,
      'bettTpFdistance': 0xa,
      'bettTpFEaseTime': 0.2,
      'angle': 0x0,
      'orbitDistance': 0x3,
      'orbitalSpeed': 0.02,
      'orbitalEasetime': 0.2,
      'orbitalEaseType': 0x1f,
      'temporaryLoc': undefined,
      'followCamHight': 0x3,
      'followCamEaseTime': 0.3,
      'followCamEaseType': 0x0,
      'placeCamType': 0x0,
      'placeCamdistance': 0x3,
      'mazeViewHight': 0xc,
      'mazeViewEaseType': 0x0,
      'xRayCamDepth': -2,
      'xRayCamEaseType': 0x0,
      'towerCamHight': 0x2d,
      'towerCamEaseType': 0x0,
      'isoCamHight': 0x4,
      'isoCamEaseType': 0x0,
      'diCamEaseType': 0x0,
      'diCamHight': 0x4,
      'triCamHight': 0x4,
      'triCamEaseType': 0x0,
      'sideCamHight': 0xc,
      'sideCamEaseType': 0x0
    });
  }
}
const camUiHandlers = {
  'MoreCamPers': MoreCamPers,
  'defaultCams': defaultCams,
  'dynamicTpps': dynamicTpps,
  'customDnamicTpps': customDnamicTpps,
  'betterFpf': betterFpf,
  'orbitalFpp': orbitalFpp,
  'staticFollowCam': staticFollowCam,
  'placeCamHere': placeCamHere,
  'topdownView': topdownView,
  'undergroundXray': undergroundXray,
  'watchTowerView': watchTowerView,
  'isometricCam': isometricCam,
  'dimetricCam': dimetricCam,
  'trimetricCam': trimetricCam,
  'sideViewCam': sideViewCam
};
function saveData(_0x2ec312) {
  const _0x51adb7 = moreCamData.get(_0x2ec312.id);
  if (_0x51adb7) {
    const _0x4166bf = JSON.stringify(_0x51adb7);
    world.setDynamicProperty(_0x2ec312.id, _0x4166bf);
  }
}
function retrieveData(_0x2c0f10) {
  const _0x210c30 = world.getDynamicProperty(_0x2c0f10.id);
  if (_0x210c30) {
    const _0x3f0ae6 = JSON.parse(_0x210c30);
    moreCamData.set(_0x2c0f10.id, _0x3f0ae6);
  }
}
world.afterEvents.itemUse.subscribe(_0x47ee53 => {
  const _0x222510 = _0x47ee53.source;
  retrieveData(_0x222510);
  initPlayer(_0x222510);
  if (_0x47ee53.itemStack?.["typeId"] === "minecraft:stick") {
    const _0x51f78c = camStateMap.get(_0x222510.id);
    const _0x2ca516 = camUiHandlers[_0x51f78c.state];
    if (_0x2ca516) {
      _0x2ca516(_0x222510);
    } else {
      console.warn("Invalid State:", _0x51f78c.state);
      _0x51f78c.state = "MoreCamPers";
    }
  }
});
export function hatJamc(_0x2a75b5) {
  const _0x23928c = callbackIds.get(_0x2a75b5.id);
  if (_0x23928c) {
    system.clearRun(_0x23928c);
    callbackIds["delete"](_0x2a75b5.id);
  }
}
world.beforeEvents.playerLeave.subscribe(_0x5ef054 => {
  const _0x19bf0e = _0x5ef054.player;
  hatJamc(_0x19bf0e);
});
export function getLocalOffset(_0x3e79fc, _0x5f5a92, _0x2c688b, _0x1f6a2e) {
  const _0x38e2c3 = _0x3e79fc.y * (Math.PI / 180);
  const _0x45fdda = _0x3e79fc.x * (Math.PI / 180);
  const _0x46e97d = Math.sin(_0x38e2c3);
  const _0xd22703 = Math.cos(_0x38e2c3);
  const _0x6d521b = Math.sin(_0x45fdda);
  const _0x3c03d1 = Math.cos(_0x45fdda);
  const _0x28aa79 = -_0x46e97d * _0x3c03d1;
  const _0x126838 = -_0x6d521b;
  const _0x135f61 = _0xd22703 * _0x3c03d1;
  const _0x6542bf = _0x46e97d * _0x6d521b;
  const _0x4a3922 = -_0xd22703 * _0x6d521b;
  return {
    'x': _0x28aa79 * _0x1f6a2e + _0xd22703 * _0x5f5a92 + _0x6542bf * _0x2c688b,
    'y': _0x126838 * _0x1f6a2e + 0 * _0x5f5a92 + _0x3c03d1 * _0x2c688b,
    'z': _0x135f61 * _0x1f6a2e + _0x46e97d * _0x5f5a92 + _0x4a3922 * _0x2c688b
  };
}
export function MoreCamPers(_0x26542c) {
  const _0x18bae0 = camStateMap.get(_0x26542c.id);
  const _0x48485c = new ActionFormData().title("§1More Cam Perspectives v3.2.0").button("Clear All ×").button("Default Cameras »»>").button("Dynamic TPP-Back »»>").button("Better TPP-Front »»>").button("Orbital FPP »»>").button("Static Follow Cam »»>").button("Place Camera Here »»>").button("Topdown/Maze View »»>").button("Underground X-Ray »»>").button("Watchtower View »»>").button("Isometric Camera »»>").button("Dimetric Camera »»>").button("Trimetric Camera »»>").button("2D Cameras (Side View) »»>").body("Made By §6DarkBlock Gaming");
  _0x48485c.show(_0x26542c).then(_0x97ab3f => {
    if (_0x97ab3f.canceled) {
      return;
    }
    const _0x6617fa = {
      0x0: () => {
        hatJamc(_0x26542c);
        _0x18bae0.state = "MoreCamPers";
        system.runTimeout(() => {
          _0x26542c.camera.clear();
        }, 1);
      },
      0x1: () => defaultCams(_0x26542c),
      0x2: () => dynamicTpps(_0x26542c),
      0x3: () => betterFpf(_0x26542c),
      0x4: () => orbitalFpp(_0x26542c),
      0x5: () => staticFollowCam(_0x26542c),
      0x6: () => placeCamHere(_0x26542c),
      0x7: () => topdownView(_0x26542c),
      0x8: () => undergroundXray(_0x26542c),
      0x9: () => watchTowerView(_0x26542c),
      0xa: () => isometricCam(_0x26542c),
      0xb: () => dimetricCam(_0x26542c),
      0xc: () => trimetricCam(_0x26542c),
      0xd: () => sideViewCam(_0x26542c)
    };
    const _0x242b1c = _0x6617fa[_0x97ab3f.selection];
    if (_0x242b1c) {
      _0x242b1c();
    }
  });
}
function defaultCams(_0x3265fa) {
  const _0x187b5a = camStateMap.get(_0x3265fa.id);
  let _0x501438 = new ActionFormData();
  _0x501438.title("Default Cameras");
  _0x501438.button("First Person");
  _0x501438.button("Third Person Back");
  _0x501438.button("Third Person Front");
  _0x501438.button("<«« Go Back");
  _0x501438.body("Made By §6DarkBlock Gaming");
  const _0x1aa9a7 = {
    0x0: () => {
      _0x3265fa.camera.setCamera("minecraft:first_person");
      _0x187b5a.state = "defaultCams";
      hatJamc(_0x3265fa);
    },
    0x1: () => {
      _0x3265fa.camera.setCamera("minecraft:third_person");
      _0x187b5a.state = "defaultCams";
      hatJamc(_0x3265fa);
    },
    0x2: () => {
      _0x3265fa.camera.setCamera("minecraft:third_person_front");
      _0x187b5a.state = "defaultCams";
      hatJamc(_0x3265fa);
    },
    0x3: () => MoreCamPers(_0x3265fa)
  };
  _0x501438.show(_0x3265fa).then(_0x46bdb0 => {
    if (_0x46bdb0.selection in _0x1aa9a7) {
      _0x1aa9a7[_0x46bdb0.selection]();
    }
  })["catch"](_0x2caab4 => {
    console.error(_0x2caab4);
  });
}
function dynamicTpps(_0x51678a) {
  let _0x459384 = new ActionFormData();
  _0x459384.title("Dynamic Third Person Cameras");
  _0x459384.button("Dynamic TPP 1");
  _0x459384.button("Dynamic TPP 2");
  _0x459384.button("Dynamic TPP 3");
  _0x459384.button("Dynamic TPP 4");
  _0x459384.button("Dynamic TPP 5");
  _0x459384.button("Dynamic TPP 6");
  _0x459384.button("Dynamic TPP 7");
  _0x459384.button("Dynamic TPP 8");
  _0x459384.button("Dynamic TPP 9");
  _0x459384.button("Dynamic TPP 10");
  _0x459384.button("Dynamic TPP 11");
  _0x459384.button("Settings");
  _0x459384.button("Reset Settings");
  _0x459384.button("Custom Dynamic TPP »»>");
  _0x459384.button("<«« Go Back");
  _0x459384.body("Made By §6DarkBlock Gaming");
  const _0x4098d7 = {
    0x0: () => dynamicTpps1(_0x51678a),
    0x1: () => dynamicTpps2(_0x51678a),
    0x2: () => dynamicTpps3(_0x51678a),
    0x3: () => dynamicTpps4(_0x51678a),
    0x4: () => dynamicTpps5(_0x51678a),
    0x5: () => dynamicTpps6(_0x51678a),
    0x6: () => dynamicTpps7(_0x51678a),
    0x7: () => dynamicTpps8(_0x51678a),
    0x8: () => dynamicTpps9(_0x51678a),
    0x9: () => dynamicTpps10(_0x51678a),
    0xa: () => dynamicTpps11(_0x51678a),
    0xb: () => dynamicTppsSett(_0x51678a),
    0xc: () => dynamicTppsReset(_0x51678a),
    0xd: () => customDnamicTpps(_0x51678a),
    0xe: () => MoreCamPers(_0x51678a)
  };
  _0x459384.show(_0x51678a).then(_0x421220 => {
    if (_0x421220.selection in _0x4098d7) {
      _0x4098d7[_0x421220.selection]();
    }
  })["catch"](_0x38c20e => {
    console.error(_0x38c20e);
  });
}
function dynamicTpps1(_0xf5079c) {
  const _0x20aa8d = camStateMap.get(_0xf5079c.id);
  const _0x2caab0 = moreCamData.get(_0xf5079c.id);
  _0x20aa8d.state = "dynamicTpps";
  hatJamc(_0xf5079c);
  const _0x34a669 = system.runInterval(() => {
    const _0x48e350 = _0xf5079c.location;
    const _0x4e8c78 = _0xf5079c.getRotation();
    const _0x4c1cc2 = getLocalOffset(_0x4e8c78, _0x2caab0.dynTppLocX * 0.8, 1.7, -2.8);
    const _0x4e341f = {
      'x': _0x48e350.x + _0x4c1cc2.x,
      'y': _0x48e350.y + _0x4c1cc2.y,
      'z': _0x48e350.z + _0x4c1cc2.z
    };
    _0xf5079c.camera.setCamera("minecraft:free", {
      'location': _0x4e341f,
      'rotation': _0x4e8c78,
      'easeOptions': {
        'easeTime': 0.3,
        'easeType': EasingType.CubicInOut
      }
    });
  }, 1);
  callbackIds.set(_0xf5079c.id, _0x34a669);
}
function dynamicTpps2(_0x4ffbad) {
  const _0x1024d7 = camStateMap.get(_0x4ffbad.id);
  const _0x366dc4 = moreCamData.get(_0x4ffbad.id);
  _0x1024d7.state = "dynamicTpps";
  hatJamc(_0x4ffbad);
  const _0x28c372 = system.runInterval(() => {
    const _0x2d75b2 = _0x4ffbad.location;
    const _0x471b3f = _0x4ffbad.getRotation();
    const _0x4acd53 = getLocalOffset(_0x471b3f, _0x366dc4.dynTppLocX * 0.7, 1.6, -0.5);
    const _0x51c181 = {
      'x': _0x2d75b2.x + _0x4acd53.x,
      'y': _0x2d75b2.y + _0x4acd53.y,
      'z': _0x2d75b2.z + _0x4acd53.z
    };
    _0x4ffbad.camera.setCamera("minecraft:free", {
      'location': _0x51c181,
      'rotation': _0x471b3f,
      'easeOptions': {
        'easeTime': 0.3,
        'easeType': EasingType.CubicInOut
      }
    });
  }, 1);
  callbackIds.set(_0x4ffbad.id, _0x28c372);
}
function dynamicTpps3(_0x1a27a8) {
  const _0x5e52b8 = camStateMap.get(_0x1a27a8.id);
  const _0x3ece13 = moreCamData.get(_0x1a27a8.id);
  _0x5e52b8.state = "dynamicTpps";
  hatJamc(_0x1a27a8);
  const _0x4aa59f = system.runInterval(() => {
    const _0x52751c = _0x1a27a8.location;
    const _0x845c4f = _0x1a27a8.getRotation();
    const _0x4964bc = getLocalOffset(_0x845c4f, _0x3ece13.dynTppLocX, 1.5, -1.8);
    const _0x149db3 = {
      'x': _0x52751c.x + _0x4964bc.x,
      'y': _0x52751c.y + _0x4964bc.y,
      'z': _0x52751c.z + _0x4964bc.z
    };
    _0x1a27a8.camera.setCamera("minecraft:free", {
      'location': _0x149db3,
      'rotation': _0x845c4f,
      'easeOptions': {
        'easeTime': 0.5,
        'easeType': EasingType.Spring
      }
    });
  }, 1);
  callbackIds.set(_0x1a27a8.id, _0x4aa59f);
}
function dynamicTpps4(_0x3efdc8) {
  const _0x426b80 = camStateMap.get(_0x3efdc8.id);
  const _0x117360 = moreCamData.get(_0x3efdc8.id);
  _0x426b80.state = "dynamicTpps";
  hatJamc(_0x3efdc8);
  const _0x338261 = system.runInterval(() => {
    const _0x4d6d3b = _0x3efdc8.location;
    const _0x143ab8 = _0x3efdc8.getRotation();
    const _0x417509 = getLocalOffset(_0x143ab8, _0x117360.dynTppLocX * 0.5, 1.5, -3);
    const _0x1920a7 = {
      'x': _0x4d6d3b.x + _0x417509.x,
      'y': _0x4d6d3b.y + _0x417509.y,
      'z': _0x4d6d3b.z + _0x417509.z
    };
    _0x3efdc8.camera.setCamera("minecraft:free", {
      'location': _0x1920a7,
      'rotation': _0x143ab8,
      'easeOptions': {
        'easeTime': 0.6,
        'easeType': EasingType.Spring
      }
    });
  }, 1);
  callbackIds.set(_0x3efdc8.id, _0x338261);
}
function dynamicTpps5(_0x48b2a5) {
  const _0x4133f8 = camStateMap.get(_0x48b2a5.id);
  _0x4133f8.state = "dynamicTpps";
  hatJamc(_0x48b2a5);
  const _0x24db37 = system.runInterval(() => {
    const _0x571dad = _0x48b2a5.location;
    const _0x201d40 = _0x48b2a5.getRotation();
    const _0x345530 = getLocalOffset(_0x201d40, 0, 1.6, -4);
    const _0xa04a00 = {
      'x': _0x571dad.x + _0x345530.x,
      'y': _0x571dad.y + _0x345530.y,
      'z': _0x571dad.z + _0x345530.z
    };
    _0x48b2a5.camera.setCamera("minecraft:free", {
      'location': _0xa04a00,
      'rotation': _0x201d40,
      'easeOptions': {
        'easeTime': 0.3,
        'easeType': EasingType.QuadraticOut
      }
    });
  }, 1);
  callbackIds.set(_0x48b2a5.id, _0x24db37);
}
function dynamicTpps6(_0x5b95ca) {
  const _0x57073a = camStateMap.get(_0x5b95ca.id);
  const _0x367568 = moreCamData.get(_0x5b95ca.id);
  _0x57073a.state = "dynamicTpps";
  hatJamc(_0x5b95ca);
  const _0x4d1d06 = system.runInterval(() => {
    const _0x27c8bd = _0x5b95ca.location;
    const _0x200c26 = _0x5b95ca.getRotation();
    const _0x2f67e1 = getLocalOffset(_0x200c26, _0x367568.dynTppLocX * 0.8, 1.6, -2.5);
    const _0x19908a = {
      'x': _0x27c8bd.x + _0x2f67e1.x,
      'y': _0x27c8bd.y + _0x2f67e1.y,
      'z': _0x27c8bd.z + _0x2f67e1.z
    };
    _0x5b95ca.camera.setCamera("minecraft:free", {
      'location': _0x19908a,
      'rotation': _0x200c26,
      'easeOptions': {
        'easeTime': 0.2,
        'easeType': EasingType.SineInOut
      }
    });
  }, 1);
  callbackIds.set(_0x5b95ca.id, _0x4d1d06);
}
function dynamicTpps7(_0xfbcb94) {
  const _0x3aafe5 = camStateMap.get(_0xfbcb94.id);
  const _0x30fdb9 = moreCamData.get(_0xfbcb94.id);
  _0x3aafe5.state = "dynamicTpps";
  hatJamc(_0xfbcb94);
  const _0x168aa6 = system.runInterval(() => {
    const _0x28bc40 = _0xfbcb94.location;
    const _0x322d3d = _0xfbcb94.getRotation();
    const _0xcdd0d = getLocalOffset(_0x322d3d, _0x30fdb9.dynTppLocX * 0.6, 2.2, -2.2);
    const _0x19b83d = {
      'x': _0x28bc40.x + _0xcdd0d.x,
      'y': _0x28bc40.y + _0xcdd0d.y,
      'z': _0x28bc40.z + _0xcdd0d.z
    };
    const _0x516274 = {
      'x': 0xf,
      'y': _0x322d3d.y
    };
    _0xfbcb94.camera.setCamera("minecraft:free", {
      'location': _0x19b83d,
      'rotation': _0x516274,
      'easeOptions': {
        'easeTime': 0.2,
        'easeType': EasingType.CubicInOut
      }
    });
  }, 1);
  callbackIds.set(_0xfbcb94.id, _0x168aa6);
}
function dynamicTpps8(_0x440fe0) {
  const _0x18fc8d = camStateMap.get(_0x440fe0.id);
  const _0x503bbb = moreCamData.get(_0x440fe0.id);
  _0x18fc8d.state = "dynamicTpps";
  hatJamc(_0x440fe0);
  const _0x1c734a = system.runInterval(() => {
    const _0x300347 = _0x440fe0.location;
    const _0x57aeb0 = _0x440fe0.getRotation();
    const _0x83d1f4 = getLocalOffset(_0x57aeb0, _0x503bbb.dynTppLocX * 0.5, 1.7, -1.3);
    const _0x331b08 = {
      'x': _0x300347.x + _0x83d1f4.x,
      'y': _0x300347.y + _0x83d1f4.y,
      'z': _0x300347.z + _0x83d1f4.z
    };
    _0x440fe0.camera.setCamera("minecraft:free", {
      'location': _0x331b08,
      'rotation': _0x57aeb0,
      'easeOptions': {
        'easeTime': 0.15,
        'easeType': EasingType.QuadInOut
      }
    });
  }, 1);
  callbackIds.set(_0x440fe0.id, _0x1c734a);
}
function dynamicTpps9(_0xe64d58) {
  const _0x546fc0 = camStateMap.get(_0xe64d58.id);
  const _0x1013b2 = moreCamData.get(_0xe64d58.id);
  _0x546fc0.state = "dynamicTpps";
  hatJamc(_0xe64d58);
  const _0x29f3b1 = system.runInterval(() => {
    const _0x349bd5 = _0xe64d58.location;
    const _0x2dbf1c = _0xe64d58.getRotation();
    const _0x52ae96 = getLocalOffset(_0x2dbf1c, _0x1013b2.dynTppLocX * 1, 1.8, -2);
    const _0x55834c = {
      'x': _0x349bd5.x + _0x52ae96.x,
      'y': _0x349bd5.y + _0x52ae96.y,
      'z': _0x349bd5.z + _0x52ae96.z
    };
    const _0x5bb78f = {
      'x': 0x5,
      'y': _0x2dbf1c.y + 15
    };
    _0xe64d58.camera.setCamera("minecraft:free", {
      'location': _0x55834c,
      'rotation': _0x5bb78f,
      'easeOptions': {
        'easeTime': 0.3,
        'easeType': EasingType.SineInOut
      }
    });
  }, 1);
  callbackIds.set(_0xe64d58.id, _0x29f3b1);
}
function dynamicTpps10(_0x17b8b2) {
  const _0x3c85eb = camStateMap.get(_0x17b8b2.id);
  const _0x2bde3c = moreCamData.get(_0x17b8b2.id);
  _0x3c85eb.state = "dynamicTpps";
  hatJamc(_0x17b8b2);
  const _0x4ffabe = system.runInterval(() => {
    const _0x5d6589 = _0x17b8b2.location;
    const _0x138b15 = _0x17b8b2.getRotation();
    const _0x3739d5 = getLocalOffset(_0x138b15, _0x2bde3c.dynTppLocX * 0.6, 1.5, -2);
    const _0x2c2403 = {
      'x': _0x5d6589.x + _0x3739d5.x,
      'y': _0x5d6589.y + _0x3739d5.y,
      'z': _0x5d6589.z + _0x3739d5.z
    };
    const _0x5118ef = {
      'x': 0x8,
      'y': _0x138b15.y + 10
    };
    _0x17b8b2.camera.setCamera("minecraft:free", {
      'location': _0x2c2403,
      'rotation': _0x5118ef,
      'easeOptions': {
        'easeTime': 0.25,
        'easeType': EasingType.CubicInOut
      }
    });
  }, 1);
  callbackIds.set(_0x17b8b2.id, _0x4ffabe);
}
function dynamicTpps11(_0x329801) {
  const _0x572048 = camStateMap.get(_0x329801.id);
  const _0x5ccbd9 = moreCamData.get(_0x329801.id);
  _0x572048.state = "dynamicTpps";
  hatJamc(_0x329801);
  const _0x4ed3cc = system.runInterval(() => {
    const _0x2cf478 = _0x329801.location;
    const _0x186a0b = _0x329801.getRotation();
    const _0x3435ef = getLocalOffset(_0x186a0b, _0x5ccbd9.dynTppLocX * 0.3, 1.6, -1.2);
    const _0x498f57 = {
      'x': _0x2cf478.x + _0x3435ef.x,
      'y': _0x2cf478.y + _0x3435ef.y,
      'z': _0x2cf478.z + _0x3435ef.z
    };
    _0x329801.camera.setCamera("minecraft:free", {
      'location': _0x498f57,
      'rotation': _0x186a0b,
      'easeOptions': {
        'easeTime': 0.15,
        'easeType': EasingType.QuadInOut
      }
    });
  }, 1);
  callbackIds.set(_0x329801.id, _0x4ed3cc);
}
function dynamicTppsSett(_0x53edc4) {
  const _0x3fa2e0 = moreCamData.get(_0x53edc4.id);
  const _0x3bfd85 = new ModalFormData().title("Settings").toggle("Left Side or Right Side", _0x3fa2e0.leftORrightbool);
  _0x3bfd85.show(_0x53edc4).then(_0xda7440 => {
    if (_0xda7440.canceled) {
      _0x53edc4.sendMessage("Please Click Submit");
      dynamicTpps(_0x53edc4);
      return;
    }
    _0x3fa2e0.leftORrightbool = _0xda7440.formValues[0];
    _0x3fa2e0.dynTppLocX = _0x3fa2e0.leftORrightbool ? -1 : 1;
    saveData(_0x53edc4);
    dynamicTpps(_0x53edc4);
  })["catch"](_0x2da05a => {
    console.error("Error showing settings form:", _0x2da05a);
  });
}
function dynamicTppsReset(_0x318a1a) {
  const _0x3731d2 = moreCamData.get(_0x318a1a.id);
  _0x3731d2.leftORrightbool = true;
  _0x3731d2.dynTppLocX = -1;
  saveData(_0x318a1a);
}
function customDnamicTpps(_0x387cd9) {
  let _0x253dbb = new ActionFormData();
  _0x253dbb.title("Custom Dynamic TPP");
  _0x253dbb.button("Custom Dynamic TPP");
  _0x253dbb.button("Customise");
  _0x253dbb.button("Reset Changes");
  _0x253dbb.button("<«« Go Back");
  _0x253dbb.body("Made By §6DarkBlock Gaming");
  const _0x5f0bb9 = {
    0x0: () => customDnamicTppsA(_0x387cd9),
    0x1: () => customDnamicTppsB(_0x387cd9),
    0x2: () => customDnamicTppsReset(_0x387cd9),
    0x3: () => dynamicTpps(_0x387cd9)
  };
  _0x253dbb.show(_0x387cd9).then(_0x3243a2 => {
    if (_0x3243a2.selection in _0x5f0bb9) {
      _0x5f0bb9[_0x3243a2.selection]();
    }
  })["catch"](_0xf9502b => {
    console.error(_0xf9502b);
  });
}
function customDnamicTppsA(_0x1dfa55) {
  const _0x41e11e = camStateMap.get(_0x1dfa55.id);
  const _0x436190 = moreCamData.get(_0x1dfa55.id);
  _0x41e11e.state = "customDnamicTpps";
  hatJamc(_0x1dfa55);
  const _0x17b4f5 = system.runInterval(() => {
    const _0x4fb16f = easeTypes[_0x436190.cusTppEaseType];
    const _0x341169 = _0x1dfa55.location;
    const _0x403b9d = _0x1dfa55.getRotation();
    const _0x2a8937 = getLocalOffset(_0x403b9d, _0x436190.cusTppLocX, _0x436190.cusTppLocY, _0x436190.cusTppLocZ);
    const _0x49c818 = {
      'x': _0x341169.x + _0x2a8937.x,
      'y': _0x341169.y + _0x2a8937.y,
      'z': _0x341169.z + _0x2a8937.z
    };
    _0x1dfa55.camera.setCamera("minecraft:free", {
      'location': _0x49c818,
      'rotation': _0x403b9d,
      'easeOptions': {
        'easeTime': _0x436190.cusTppEaseTime,
        'easeType': EasingType[_0x4fb16f]
      }
    });
  }, 1);
  callbackIds.set(_0x1dfa55.id, _0x17b4f5);
}
function customDnamicTppsB(_0x366e56) {
  const _0x276d98 = moreCamData.get(_0x366e56.id);
  const _0x45987b = new ModalFormData().title("Make Your Custom Dynamic tpp").slider("Left-Right [X]", -5, 5, 0.01, _0x276d98.cusTppLocX).slider("Up-Down [Y]", 0, 3, 0.01, _0x276d98.cusTppLocY).slider("Forward-Backward [Z]", -5, 0, 0.01, _0x276d98.cusTppLocZ).slider("Select Ease Time", 0.1, 1, 0.1, _0x276d98.cusTppEaseTime).dropdown("Select Ease Type", easeTypes, _0x276d98.cusTppEaseType);
  _0x45987b.show(_0x366e56).then(_0x19c98f => {
    if (_0x19c98f.canceled) {
      _0x366e56.sendMessage("Please Click Submit");
      customDnamicTpps(_0x366e56);
      return;
    }
    _0x276d98.cusTppLocX = Math.floor(_0x19c98f.formValues[0] * 10) / 10;
    _0x276d98.cusTppLocY = Math.floor(_0x19c98f.formValues[1] * 10) / 10;
    _0x276d98.cusTppLocZ = Math.floor(_0x19c98f.formValues[2] * 10) / 10;
    _0x276d98.cusTppEaseTime = Math.floor((typeof _0x19c98f.formValues[3] === "number" && _0x19c98f.formValues[3] >= 0.1 ? _0x19c98f.formValues[3] : 0.3) * 10) / 10;
    _0x276d98.cusTppEaseType = _0x19c98f.formValues[4];
    saveData(_0x366e56);
    customDnamicTpps(_0x366e56);
    customDnamicTppsA(_0x366e56);
  })["catch"](_0x143cdc => {
    console.error(_0x143cdc);
  });
}
function customDnamicTppsReset(_0x5ebab3) {
  const _0x2cbb68 = moreCamData.get(_0x5ebab3.id);
  _0x2cbb68.cusTppLocX = -1;
  _0x2cbb68.cusTppLocY = 1.5;
  _0x2cbb68.cusTppLocZ = -1.8;
  _0x2cbb68.cusTppEaseTime = 0.3;
  _0x2cbb68.cusTppEaseType = 0;
  saveData(_0x5ebab3);
  customDnamicTppsA(_0x5ebab3);
}
function betterFpf(_0x4a9a7c) {
  let _0x14765b = new ActionFormData();
  _0x14765b.title("Better First Person");
  _0x14765b.button("Better First Person");
  _0x14765b.button("Settings");
  _0x14765b.button("Reset Settings");
  _0x14765b.button("<«« Go Back");
  _0x14765b.body("Made By §6DarkBlock Gaming");
  const _0x2d6e12 = {
    0x0: () => betterFpfA(_0x4a9a7c),
    0x1: () => betterFppB(_0x4a9a7c),
    0x2: () => betterFppReset(_0x4a9a7c),
    0x3: () => MoreCamPers(_0x4a9a7c)
  };
  _0x14765b.show(_0x4a9a7c).then(_0x5362f9 => {
    if (_0x5362f9.selection in _0x2d6e12) {
      _0x2d6e12[_0x5362f9.selection]();
    }
  })["catch"](_0xd7737c => {
    console.error(_0xd7737c);
  });
}
function betterFpfA(_0x35669f) {
  const _0x1c8f4e = camStateMap.get(_0x35669f.id);
  const _0x3473df = moreCamData.get(_0x35669f.id);
  _0x1c8f4e.state = "betterFpf";
  hatJamc(_0x35669f);
  const _0x19e755 = system.runInterval(() => {
    const _0x362a48 = _0x35669f.location;
    const _0x45f6dc = _0x35669f.getViewDirection();
    const _0x18576d = easeTypes[_0x3473df.bettTpFEaseType];
    const _0x111271 = {
      'x': _0x362a48.x + _0x45f6dc.x * _0x3473df.bettTpFdistance,
      'y': _0x362a48.y + 1.8 + _0x45f6dc.y * _0x3473df.bettTpFdistance,
      'z': _0x362a48.z + _0x45f6dc.z * _0x3473df.bettTpFdistance
    };
    _0x35669f.camera.setCamera("minecraft:free", {
      'location': _0x111271,
      'facingEntity': _0x35669f,
      'easeOptions': {
        'easeTime': _0x3473df.bettTpFEaseTime,
        'easeType': EasingType[_0x18576d]
      }
    });
  }, 1);
  callbackIds.set(_0x35669f.id, _0x19e755);
}
function betterFppB(_0x2d82ce) {
  const _0x4afd98 = moreCamData.get(_0x2d82ce.id);
  const _0x3325a6 = new ModalFormData().title("Customise Better FPP").slider("Distance From Player", 1, 15, 1, _0x4afd98.bettTpFdistance).slider("Select Ease Time", 0.1, 2, 0.1, _0x4afd98.bettTpFEaseTime).dropdown("Select Ease Type", easeTypes, _0x4afd98.bettTpFEaseType);
  _0x3325a6.show(_0x2d82ce).then(_0x4a4e30 => {
    if (_0x4a4e30.canceled) {
      _0x2d82ce.sendMessage("Please Click Submit");
      betterFpf(_0x2d82ce);
      return;
    }
    _0x4afd98.bettTpFdistance = Math.max(_0x4a4e30.formValues[0], 1);
    _0x4afd98.bettTpFEaseTime = Math.floor((typeof _0x4a4e30.formValues[1] === "number" && _0x4a4e30.formValues[1] >= 0.1 ? _0x4a4e30.formValues[1] : 0.2) * 10) / 10;
    _0x4afd98.bettTpFEaseType = _0x4a4e30.formValues[2];
    saveData(_0x2d82ce);
    betterFpf(_0x2d82ce);
    betterFpfA(_0x2d82ce);
  })["catch"](_0x30674c => {
    console.error(_0x30674c);
  });
}
function betterFppReset(_0xd391f6) {
  const _0x51d041 = moreCamData.get(_0xd391f6.id);
  _0x51d041.bettTpFEaseType = 0;
  _0x51d041.bettTpFdistance = 10;
  _0x51d041.bettTpFEaseTime = 0.2;
  saveData(_0xd391f6);
  betterFpfA(_0xd391f6);
}
function orbitalFpp(_0x461702) {
  let _0x185819 = new ActionFormData();
  _0x185819.button("Orbital Cam");
  _0x185819.button("Settings");
  _0x185819.button("Reset Settings");
  _0x185819.button("<«« Go Back");
  _0x185819.body("Made By §6DarkBlock Gaming");
  const _0x4c79a5 = {
    0x0: () => orbitalFppA(_0x461702),
    0x1: () => orbitalFppSett(_0x461702),
    0x2: () => orbitalFppReset(_0x461702),
    0x3: () => MoreCamPers(_0x461702)
  };
  _0x185819.show(_0x461702).then(_0x13cc64 => {
    if (_0x13cc64.selection in _0x4c79a5) {
      _0x4c79a5[_0x13cc64.selection]();
    }
  })["catch"](_0x490541 => {
    console.error(_0x490541);
  });
}
function orbitalFppA(_0x58bfcb) {
  const _0x3b1c53 = camStateMap.get(_0x58bfcb.id);
  const _0x6c2ad = moreCamData.get(_0x58bfcb.id);
  hatJamc(_0x58bfcb);
  _0x3b1c53.state = "orbitalFpp";
  const _0x348b60 = system.runInterval(() => {
    _0x6c2ad.angle += _0x6c2ad.orbitalSpeed;
    const _0x4bc90f = _0x58bfcb.location;
    const _0x14ddd2 = easeTypes[_0x6c2ad.orbitalEaseType];
    const _0x1b3234 = {
      'x': _0x4bc90f.x + _0x6c2ad.orbitDistance * Math.cos(_0x6c2ad.angle),
      'y': _0x4bc90f.y + 1.5,
      'z': _0x4bc90f.z + _0x6c2ad.orbitDistance * Math.sin(_0x6c2ad.angle)
    };
    _0x58bfcb.camera.setCamera("minecraft:free", {
      'location': _0x1b3234,
      'facingEntity': _0x58bfcb,
      'easeOptions': {
        'easeTime': _0x6c2ad.orbitalEasetime,
        'easeType': EasingType[_0x14ddd2]
      }
    });
  }, 1);
  callbackIds.set(_0x58bfcb.id, _0x348b60);
}
function orbitalFppSett(_0x570d29) {
  const _0x3b08d5 = moreCamData.get(_0x570d29.id);
  const _0x4fec92 = new ModalFormData().title("Orbital Cam").slider("Distance From Player", 1, 40, 1, _0x3b08d5.orbitDistance).slider("Orbital Speed", 0.01, 0.9, 0.01, _0x3b08d5.orbitalSpeed).slider("Select Ease Time", 0.1, 1, 0.1, _0x3b08d5.orbitalEasetime).dropdown("Select Ease Type", easeTypes, _0x3b08d5.orbitalEaseType);
  _0x4fec92.show(_0x570d29).then(_0x1e3640 => {
    if (_0x1e3640.canceled) {
      _0x570d29.sendMessage("Please Click Submit");
      orbitalFpp(_0x570d29);
      return;
    }
    _0x3b08d5.orbitDistance = _0x1e3640.formValues[0];
    _0x3b08d5.orbitalSpeed = Math.floor((typeof _0x1e3640.formValues[1] === "number" && _0x1e3640.formValues[1] >= 0.01 ? _0x1e3640.formValues[1] : 0.02) * 100) / 100;
    _0x3b08d5.orbitalEasetime = Math.floor((typeof _0x1e3640.formValues[2] === "number" && _0x1e3640.formValues[2] >= 0.1 ? _0x1e3640.formValues[2] : 0.2) * 10) / 10;
    _0x3b08d5.orbitalEaseType = _0x1e3640.formValues[3];
    orbitalFpp(_0x570d29);
    saveData(_0x570d29);
    orbitalFppA(_0x570d29);
  })["catch"](_0x14315e => {
    console.error(_0x14315e);
  });
}
function orbitalFppReset(_0x333f0c) {
  const _0x3669b1 = moreCamData.get(_0x333f0c.id);
  _0x3669b1.angle = 0;
  _0x3669b1.orbitDistance = 3;
  _0x3669b1.orbitalSpeed = 0.02;
  _0x3669b1.orbitalEasetime = 0.2;
  _0x3669b1.orbitalEaseType = 31;
  saveData(_0x333f0c);
  orbitalFppA(_0x333f0c);
}
function staticFollowCam(_0x49824e) {
  let _0x18ddd1 = new ActionFormData();
  _0x18ddd1.title("Static Follow Camera");
  _0x18ddd1.button("Static Follow Cam");
  _0x18ddd1.button("Settings");
  _0x18ddd1.button("Reset Settings");
  _0x18ddd1.button("<«« Go Back");
  _0x18ddd1.body("Made By §6DarkBlock Gaming");
  const _0x13675f = {
    0x0: () => staticFollowCamA(_0x49824e),
    0x1: () => staticFollowCamB(_0x49824e),
    0x2: () => staticFollowCamReset(_0x49824e),
    0x3: () => MoreCamPers(_0x49824e)
  };
  _0x18ddd1.show(_0x49824e).then(_0x32b82a => {
    if (_0x32b82a.selection in _0x13675f) {
      _0x13675f[_0x32b82a.selection]();
    }
  })["catch"](_0x4273a5 => {
    console.error(_0x4273a5);
  });
}
function staticFollowCamA(_0x54302f) {
  const _0x2f753f = camStateMap.get(_0x54302f.id);
  const _0x4e5da9 = moreCamData.get(_0x54302f.id);
  _0x2f753f.state = "staticFollowCam";
  hatJamc(_0x54302f);
  _0x54302f.camera.setCamera("minecraft:free", {
    'location': {
      'x': _0x54302f.location.x,
      'y': _0x54302f.location.y + _0x4e5da9.followCamHight,
      'z': _0x54302f.location.z
    },
    'facingEntity': _0x54302f
  });
  _0x4e5da9.temporaryLoc = {
    'x': _0x54302f.location.x,
    'y': _0x54302f.location.y,
    'z': _0x54302f.location.z
  };
  saveData(_0x54302f);
  const _0x3e2153 = easeTypes[_0x4e5da9.followCamEaseType];
  const _0x52cc49 = system.runInterval(() => {
    _0x54302f.camera.setCamera("minecraft:free", {
      'facingEntity': _0x54302f,
      'easeOptions': {
        'easeTime': _0x4e5da9.followCamEaseTime,
        'easeType': EasingType[_0x3e2153]
      }
    });
  }, 1);
  callbackIds.set(_0x54302f.id, _0x52cc49);
}
function staticFollowCamB(_0x1103a6) {
  const _0xece22c = moreCamData.get(_0x1103a6.id);
  const _0x48d7b2 = new ModalFormData().title("Settings").slider("Select distance", 2, 20, 2, _0xece22c.followCamHight).slider("Select Ease Time", 0.1, 1, 0.1, _0xece22c.followCamEaseTime).dropdown("Select Ease Type", easeTypes, _0xece22c.followCamEaseType);
  _0x48d7b2.show(_0x1103a6).then(_0x8d3699 => {
    if (_0x8d3699.canceled) {
      _0x1103a6.sendMessage("Please Click Submit");
      staticFollowCam(_0x1103a6);
      return;
    }
    _0xece22c.followCamHight = _0x8d3699.formValues[0];
    _0xece22c.followCamEaseTime = Math.floor((typeof _0x8d3699.formValues[1] === "number" && _0x8d3699.formValues[1] >= 0.1 ? _0x8d3699.formValues[1] : 0.2) * 10) / 10;
    _0xece22c.followCamEaseType = _0x8d3699.formValues[2];
    _0x1103a6.camera.setCamera("minecraft:free", {
      'location': {
        'x': _0xece22c.temporaryLoc.x,
        'y': _0xece22c.temporaryLoc.y + _0xece22c.followCamHight,
        'z': _0xece22c.temporaryLoc.z
      },
      'facingEntity': _0x1103a6
    });
    staticFollowCam(_0x1103a6);
    saveData(_0x1103a6);
  })["catch"](_0x338176 => {
    console.error(_0x338176);
  });
}
function staticFollowCamReset(_0x2dfc6e) {
  const _0x104a3b = moreCamData.get(_0x2dfc6e.id);
  _0x104a3b.followCamHight = 3;
  _0x104a3b.followCamEaseTime = 0.2;
  _0x104a3b.followCamEaseType = 0;
  _0x2dfc6e.camera.setCamera("minecraft:free", {
    'location': {
      'x': _0x104a3b.temporaryLoc.x,
      'y': _0x104a3b.temporaryLoc.y + _0x104a3b.followCamHight,
      'z': _0x104a3b.temporaryLoc.z
    },
    'facingEntity': _0x2dfc6e
  });
  saveData(_0x2dfc6e);
}
function placeCamHere(_0xb672eb) {
  let _0x69fd6d = new ActionFormData();
  _0x69fd6d.title("Place Camera Here");
  _0x69fd6d.button("Place Camera Here");
  _0x69fd6d.button("Settings");
  _0x69fd6d.button("Reset Settings");
  _0x69fd6d.button("<«« Go Back");
  _0x69fd6d.body("Made By §6DarkBlock Gaming");
  const _0x2c53d4 = {
    0x0: () => placeCAmHereA(_0xb672eb),
    0x1: () => placeCamHereB(_0xb672eb),
    0x2: () => placeCamReset(_0xb672eb),
    0x3: () => MoreCamPers(_0xb672eb)
  };
  _0x69fd6d.show(_0xb672eb).then(_0xbe6845 => {
    if (_0xbe6845.selection in _0x2c53d4) {
      _0x2c53d4[_0xbe6845.selection]();
    }
  })["catch"](_0x4e9741 => {
    console.error(_0x4e9741);
  });
}
function placeCAmHereA(_0x58ce31) {
  const _0x4bf4d8 = camStateMap.get(_0x58ce31.id);
  const _0x27a550 = moreCamData.get(_0x58ce31.id);
  _0x4bf4d8.state = "placeCamHere";
  hatJamc(_0x58ce31);
  const _0x448f97 = _0x58ce31.location;
  const _0x1300d1 = _0x58ce31.getRotation();
  const _0x4f49fc = _0x58ce31.getViewDirection();
  if (_0x27a550.placeCamType === 0) {
    _0x58ce31.camera.setCamera("minecraft:free", {
      'location': {
        'x': _0x448f97.x,
        'y': _0x448f97.y + 1.8,
        'z': _0x448f97.z
      },
      'rotation': _0x1300d1
    });
  }
  const _0x5c72ff = {
    'x': _0x448f97.x + _0x4f49fc.x * _0x27a550.placeCamdistance,
    'y': _0x448f97.y + 1.8 + _0x4f49fc.y * _0x27a550.placeCamdistance,
    'z': _0x448f97.z + _0x4f49fc.z * _0x27a550.placeCamdistance
  };
  if (_0x27a550.placeCamType === 1) {
    _0x58ce31.camera.setCamera("minecraft:free", {
      'location': _0x5c72ff,
      'facingEntity': _0x58ce31
    });
  }
}
function placeCamHereB(_0x5c5f48) {
  const _0x77989a = moreCamData.get(_0x5c5f48.id);
  const _0x43364d = new ModalFormData().title("Settings").dropdown("Select Ease Type", ["Player's Perspective", "Towards Player"], _0x77989a.placeCamType).slider("Select Distance From Player", 1, 20, 1, _0x77989a.placeCamdistance);
  _0x43364d.show(_0x5c5f48).then(_0x4a2477 => {
    if (_0x4a2477.canceled) {
      _0x5c5f48.sendMessage("Please Click Submit");
      placeCamHere(_0x5c5f48);
      return;
    }
    _0x77989a.placeCamType = _0x4a2477.formValues[0];
    _0x77989a.placeCamdistance = _0x4a2477.formValues[1];
    placeCamHere(_0x5c5f48);
    saveData(_0x5c5f48);
  })["catch"](_0x15c5db => {
    console.error(_0x15c5db);
  });
}
function placeCamReset(_0x4e082d) {
  const _0x152cbc = moreCamData.get(_0x4e082d.id);
  _0x152cbc.placeCamType = 0;
  _0x152cbc.placeCamdistance = 3;
  saveData(_0x4e082d);
}
function topdownView(_0x4ea729) {
  let _0x167741 = new ActionFormData();
  _0x167741.title("Topdown/Maze View Camera");
  _0x167741.button("Topdown/Maze View");
  _0x167741.button("Settings");
  _0x167741.button("Reset Settings");
  _0x167741.button("<«« Go Back");
  _0x167741.body("Made By §6DarkBlock Gaming");
  const _0x142035 = {
    0x0: () => topdownViewA(_0x4ea729),
    0x1: () => topdownViewB(_0x4ea729),
    0x2: () => topdownViewReset(_0x4ea729),
    0x3: () => MoreCamPers(_0x4ea729)
  };
  _0x167741.show(_0x4ea729).then(_0x59833d => {
    if (_0x59833d.selection in _0x142035) {
      _0x142035[_0x59833d.selection]();
    }
  })["catch"](_0x55c633 => {
    console.error(_0x55c633);
  });
}
function topdownViewA(_0x5e6c15) {
  const _0x1e028c = camStateMap.get(_0x5e6c15.id);
  const _0x1d42dc = moreCamData.get(_0x5e6c15.id);
  _0x1e028c.state = "topdownView";
  hatJamc(_0x5e6c15);
  const _0xc3366 = system.runInterval(() => {
    const _0x104215 = easeTypes[_0x1d42dc.mazeViewEaseType];
    const _0x453555 = _0x5e6c15.location;
    const _0x65f04d = _0x5e6c15.getRotation();
    _0x5e6c15.camera.setCamera("minecraft:free", {
      'location': {
        'x': _0x453555.x,
        'y': _0x453555.y + _0x1d42dc.mazeViewHight,
        'z': _0x453555.z
      },
      'rotation': {
        'x': 0x5a,
        'y': _0x65f04d.y
      },
      'easeOptions': {
        'easeTime': 0.4,
        'easeType': EasingType[_0x104215]
      }
    });
  }, 1);
  callbackIds.set(_0x5e6c15.id, _0xc3366);
}
function topdownViewB(_0x3a4d00) {
  const _0x19cbdd = moreCamData.get(_0x3a4d00.id);
  const _0x25ae61 = new ModalFormData().title("Settings").slider("Select distance", 2, 42, 4, _0x19cbdd.mazeViewHight).dropdown("Select Ease Type", easeTypes, _0x19cbdd.mazeViewEaseType);
  _0x25ae61.show(_0x3a4d00).then(_0x197e35 => {
    if (_0x197e35.canceled) {
      _0x3a4d00.sendMessage("Please Click Submit");
      topdownView(_0x3a4d00);
      return;
    }
    _0x19cbdd.mazeViewHight = _0x197e35.formValues[0];
    _0x19cbdd.mazeViewEaseType = _0x197e35.formValues[1];
    topdownView(_0x3a4d00);
    saveData(_0x3a4d00);
    topdownViewA(_0x3a4d00);
  })["catch"](_0x2b7591 => {
    console.error(_0x2b7591);
  });
}
function topdownViewReset(_0x580699) {
  const _0x524346 = moreCamData.get(_0x580699.id);
  _0x524346.mazeViewHight = 12;
  _0x524346.mazeViewEaseType = 0;
  saveData(_0x580699);
  topdownViewA(_0x580699);
}
function watchTowerView(_0x52e1a1) {
  let _0x175727 = new ActionFormData();
  _0x175727.title("WatchTower View");
  _0x175727.button("Watchtower View");
  _0x175727.button("Settings");
  _0x175727.button("Reset Settings");
  _0x175727.button("<«« Go Back");
  _0x175727.body("Made By §6DarkBlock Gaming");
  const _0x8df342 = {
    0x0: () => watchTowerViewA(_0x52e1a1),
    0x1: () => watchTowerViewB(_0x52e1a1),
    0x2: () => watchTowerViewReset(_0x52e1a1),
    0x3: () => MoreCamPers(_0x52e1a1)
  };
  _0x175727.show(_0x52e1a1).then(_0x5afe6b => {
    if (_0x5afe6b.selection in _0x8df342) {
      _0x8df342[_0x5afe6b.selection]();
    }
  })["catch"](_0x421acd => {
    console.error(_0x421acd);
  });
}
function watchTowerViewA(_0x33b5b9) {
  const _0x24ae0c = camStateMap.get(_0x33b5b9.id);
  const _0x3c3a61 = moreCamData.get(_0x33b5b9.id);
  _0x24ae0c.state = "watchTowerView";
  hatJamc(_0x33b5b9);
  const _0x3ff506 = system.runInterval(() => {
    const _0x488612 = easeTypes[_0x3c3a61.towerCamEaseType];
    const _0x59750a = _0x33b5b9.location;
    const _0x271aa6 = _0x33b5b9.getRotation();
    _0x33b5b9.camera.setCamera("minecraft:free", {
      'location': {
        'x': _0x59750a.x,
        'y': _0x59750a.y + _0x3c3a61.towerCamHight,
        'z': _0x59750a.z
      },
      'rotation': _0x271aa6,
      'easeOptions': {
        'easeTime': 0.2,
        'easeType': EasingType[_0x488612]
      }
    });
  }, 1);
  callbackIds.set(_0x33b5b9.id, _0x3ff506);
}
function watchTowerViewB(_0x3a03e6) {
  const _0x1d89b7 = moreCamData.get(_0x3a03e6.id);
  const _0x341af3 = new ModalFormData().title("Settings").slider("Select distance", 20, 100, 5, _0x1d89b7.towerCamHight).dropdown("Select Ease Type", easeTypes, _0x1d89b7.towerCamEaseType);
  _0x341af3.show(_0x3a03e6).then(_0x259fe6 => {
    if (_0x259fe6.canceled) {
      _0x3a03e6.sendMessage("Please Click Submit");
      watchTowerView(_0x3a03e6);
      return;
    }
    _0x1d89b7.towerCamHight = _0x259fe6.formValues[0];
    _0x1d89b7.towerCamEaseType = _0x259fe6.formValues[1];
    watchTowerView(_0x3a03e6);
    saveData(_0x3a03e6);
    watchTowerViewA(_0x3a03e6);
  })["catch"](_0x40366c => {
    console.error(_0x40366c);
  });
}
function watchTowerViewReset(_0x38c5c8) {
  const _0x14068d = moreCamData.get(_0x38c5c8.id);
  _0x14068d.towerCamHight = 45;
  _0x14068d.towerCamEaseType = 0;
  _0x14068d.towerCamHight = 45;
  _0x14068d.towerCamEaseType = 0;
  saveData(_0x38c5c8);
  watchTowerViewA(_0x38c5c8);
}
function isometricCam(_0x3b5dd5) {
  let _0x563a7d = new ActionFormData();
  _0x563a7d.title("Isometric Cameras");
  _0x563a7d.button("Isometric NW");
  _0x563a7d.button("Isometric NE");
  _0x563a7d.button("Isometric SE");
  _0x563a7d.button("Isometric SW");
  _0x563a7d.button("Settings");
  _0x563a7d.button("Reset Settings");
  _0x563a7d.button("<«« Go Back");
  _0x563a7d.body("Made By §6DarkBlock Gaming");
  const _0x3592eb = {
    0x0: () => isometricCamA(_0x3b5dd5),
    0x1: () => isometricCamB(_0x3b5dd5),
    0x2: () => isometricCamC(_0x3b5dd5),
    0x3: () => isometricCamD(_0x3b5dd5),
    0x4: () => isometricCamE(_0x3b5dd5),
    0x5: () => isometricCamReset(_0x3b5dd5),
    0x6: () => MoreCamPers(_0x3b5dd5)
  };
  _0x563a7d.show(_0x3b5dd5).then(_0x149fbf => {
    if (_0x149fbf.selection in _0x3592eb) {
      _0x3592eb[_0x149fbf.selection]();
    }
  })["catch"](_0x126044 => {
    console.error(_0x126044);
  });
}
function isometricCamA(_0x266cb5) {
  const _0x4c978e = camStateMap.get(_0x266cb5.id);
  const _0x2d68db = moreCamData.get(_0x266cb5.id);
  _0x4c978e.state = "isometricCam";
  hatJamc(_0x266cb5);
  const _0x10e35f = system.runInterval(() => {
    const _0x5e0055 = easeTypes[_0x2d68db.isoCamEaseType];
    const _0x2bc142 = _0x266cb5.location;
    _0x266cb5.camera.setCamera("minecraft:free", {
      'location': {
        'x': _0x2bc142.x + (_0x2d68db.isoCamHight + 1.77),
        'y': _0x2bc142.y + (_0x2d68db.isoCamHight + 3.57),
        'z': _0x2bc142.z + (_0x2d68db.isoCamHight + 1.77)
      },
      'facingEntity': _0x266cb5,
      'easeOptions': {
        'easeTime': 0.25,
        'easeType': EasingType[_0x5e0055]
      }
    });
  }, 1);
  callbackIds.set(_0x266cb5.id, _0x10e35f);
}
function isometricCamB(_0x4f4299) {
  const _0x1101c0 = camStateMap.get(_0x4f4299.id);
  const _0x35355e = moreCamData.get(_0x4f4299.id);
  _0x1101c0.state = "isometricCam";
  hatJamc(_0x4f4299);
  const _0x20bd19 = system.runInterval(() => {
    const _0x26140d = easeTypes[_0x35355e.isoCamEaseType];
    const _0x5c1dd9 = _0x4f4299.location;
    _0x4f4299.camera.setCamera("minecraft:free", {
      'location': {
        'x': _0x5c1dd9.x - (_0x35355e.isoCamHight + 1.77),
        'y': _0x5c1dd9.y + (_0x35355e.isoCamHight + 3.57),
        'z': _0x5c1dd9.z + (_0x35355e.isoCamHight + 1.77)
      },
      'facingEntity': _0x4f4299,
      'easeOptions': {
        'easeTime': 0.25,
        'easeType': EasingType[_0x26140d]
      }
    });
  }, 1);
  callbackIds.set(_0x4f4299.id, _0x20bd19);
}
function isometricCamC(_0x3f6975) {
  const _0x5729c9 = camStateMap.get(_0x3f6975.id);
  const _0xd483ab = moreCamData.get(_0x3f6975.id);
  _0x5729c9.state = "isometricCam";
  hatJamc(_0x3f6975);
  const _0x344e63 = system.runInterval(() => {
    const _0x2f153b = easeTypes[_0xd483ab.isoCamEaseType];
    const _0x571c1c = _0x3f6975.location;
    _0x3f6975.camera.setCamera("minecraft:free", {
      'location': {
        'x': _0x571c1c.x - (_0xd483ab.isoCamHight + 1.77),
        'y': _0x571c1c.y + (_0xd483ab.isoCamHight + 3.57),
        'z': _0x571c1c.z - (_0xd483ab.isoCamHight + 1.77)
      },
      'facingEntity': _0x3f6975,
      'easeOptions': {
        'easeTime': 0.25,
        'easeType': EasingType[_0x2f153b]
      }
    });
  }, 1);
  callbackIds.set(_0x3f6975.id, _0x344e63);
}
function isometricCamD(_0x53fba9) {
  const _0x457c14 = camStateMap.get(_0x53fba9.id);
  const _0x5b9f52 = moreCamData.get(_0x53fba9.id);
  _0x457c14.state = "isometricCam";
  hatJamc(_0x53fba9);
  const _0x5b3947 = system.runInterval(() => {
    const _0x1a71fc = easeTypes[_0x5b9f52.isoCamEaseType];
    const _0x1d778a = _0x53fba9.location;
    _0x53fba9.camera.setCamera("minecraft:free", {
      'location': {
        'x': _0x1d778a.x + (_0x5b9f52.isoCamHight + 1.77),
        'y': _0x1d778a.y + (_0x5b9f52.isoCamHight + 3.57),
        'z': _0x1d778a.z - (_0x5b9f52.isoCamHight + 1.77)
      },
      'facingEntity': _0x53fba9,
      'easeOptions': {
        'easeTime': 0.25,
        'easeType': EasingType[_0x1a71fc]
      }
    });
  }, 1);
  callbackIds.set(_0x53fba9.id, _0x5b3947);
}
function isometricCamE(_0xbe202c) {
  const _0x4cd0a5 = moreCamData.get(_0xbe202c.id);
  const _0x49ee8e = new ModalFormData().title("Settings").slider("Select distance", 1, 10, 1, _0x4cd0a5.isoCamHight).dropdown("Select Ease Type", easeTypes, _0x4cd0a5.isoCamEaseType);
  _0x49ee8e.show(_0xbe202c).then(_0x5ba141 => {
    if (_0x5ba141.canceled) {
      _0xbe202c.sendMessage("Please Click Submit");
      isometricCam(_0xbe202c);
      return;
    }
    _0x4cd0a5.isoCamHight = _0x5ba141.formValues[0];
    _0x4cd0a5.isoCamEaseType = _0x5ba141.formValues[1];
    isometricCam(_0xbe202c);
    saveData(_0xbe202c);
  })["catch"](_0x3f5c1a => {
    console.error("Error showing settings form:", _0x3f5c1a);
  });
}
function isometricCamReset(_0x458622) {
  const _0xd0412e = moreCamData.get(_0x458622.id);
  _0xd0412e.isoCamHight = 4;
  _0xd0412e.isoCamEaseType = 0;
  saveData(_0x458622);
}
function dimetricCam(_0x1c704b) {
  let _0x2f1ffc = new ActionFormData();
  _0x2f1ffc.title("Dimetric Camera");
  _0x2f1ffc.button("Dimetric NW");
  _0x2f1ffc.button("Dimetric NE");
  _0x2f1ffc.button("Dimetric SE");
  _0x2f1ffc.button("Dimetric SW");
  _0x2f1ffc.button("Settings");
  _0x2f1ffc.button("Reset Settings");
  _0x2f1ffc.button("<«« Go Back");
  _0x2f1ffc.body("Made By §6DarkBlock Gaming");
  const _0x399fd3 = {
    0x0: () => dimetricCamA(_0x1c704b),
    0x1: () => dimetricCamB(_0x1c704b),
    0x2: () => dimetricCamC(_0x1c704b),
    0x3: () => dimetricCamD(_0x1c704b),
    0x4: () => dimetricCamE(_0x1c704b),
    0x5: () => dimetricCamReset(_0x1c704b),
    0x6: () => MoreCamPers(_0x1c704b)
  };
  _0x2f1ffc.show(_0x1c704b).then(_0x73b64c => {
    if (_0x73b64c.selection in _0x399fd3) {
      _0x399fd3[_0x73b64c.selection]();
    }
  })["catch"](_0x5b2729 => {
    console.error(_0x5b2729);
  });
}
function dimetricCamA(_0x40e3d1) {
  const _0x5d5e68 = camStateMap.get(_0x40e3d1.id);
  const _0x2e17f5 = moreCamData.get(_0x40e3d1.id);
  _0x5d5e68.state = "dimetricCam";
  hatJamc(_0x40e3d1);
  const _0x158480 = system.runInterval(() => {
    const _0x3e3262 = easeTypes[_0x2e17f5.diCamEaseType];
    const _0x34fa4c = _0x40e3d1.location;
    _0x40e3d1.camera.setCamera("minecraft:free", {
      'location': {
        'x': _0x34fa4c.x + (_0x2e17f5.diCamHight + 3.07),
        'y': _0x34fa4c.y + (_0x2e17f5.diCamHight + 2.8),
        'z': _0x34fa4c.z + (_0x2e17f5.diCamHight + 3.07)
      },
      'facingEntity': _0x40e3d1,
      'easeOptions': {
        'easeTime': 0.25,
        'easeType': EasingType[_0x3e3262]
      }
    });
  }, 1);
  callbackIds.set(_0x40e3d1.id, _0x158480);
}
function dimetricCamB(_0x4253b6) {
  const _0x147b9c = camStateMap.get(_0x4253b6.id);
  const _0x3d185c = moreCamData.get(_0x4253b6.id);
  _0x147b9c.state = "dimetricCam";
  hatJamc(_0x4253b6);
  const _0x413998 = system.runInterval(() => {
    const _0x1d4356 = easeTypes[_0x3d185c.diCamEaseType];
    const _0x3d9549 = _0x4253b6.location;
    _0x4253b6.camera.setCamera("minecraft:free", {
      'location': {
        'x': _0x3d9549.x - (_0x3d185c.diCamHight + 3.07),
        'y': _0x3d9549.y + (_0x3d185c.diCamHight + 2.8),
        'z': _0x3d9549.z + (_0x3d185c.diCamHight + 3.07)
      },
      'facingEntity': _0x4253b6,
      'easeOptions': {
        'easeTime': 0.25,
        'easeType': EasingType[_0x1d4356]
      }
    });
  }, 1);
  callbackIds.set(_0x4253b6.id, _0x413998);
}
function dimetricCamC(_0x465580) {
  const _0x767123 = camStateMap.get(_0x465580.id);
  const _0x390940 = moreCamData.get(_0x465580.id);
  _0x767123.state = "dimetricCam";
  hatJamc(_0x465580);
  const _0x4d7836 = system.runInterval(() => {
    const _0x273e3f = easeTypes[_0x390940.diCamEaseType];
    const _0x278e05 = _0x465580.location;
    _0x465580.camera.setCamera("minecraft:free", {
      'location': {
        'x': _0x278e05.x - (_0x390940.diCamHight + 3.07),
        'y': _0x278e05.y + (_0x390940.diCamHight + 2.8),
        'z': _0x278e05.z - (_0x390940.diCamHight + 3.07)
      },
      'facingEntity': _0x465580,
      'easeOptions': {
        'easeTime': 0.25,
        'easeType': EasingType[_0x273e3f]
      }
    });
  }, 1);
  callbackIds.set(_0x465580.id, _0x4d7836);
}
function dimetricCamD(_0x5efdd9) {
  const _0x5ae226 = camStateMap.get(_0x5efdd9.id);
  const _0x29bd08 = moreCamData.get(_0x5efdd9.id);
  _0x5ae226.state = "dimetricCam";
  hatJamc(_0x5efdd9);
  const _0xe0713b = system.runInterval(() => {
    const _0xa7d8e2 = easeTypes[_0x29bd08.diCamEaseType];
    const _0x59016a = _0x5efdd9.location;
    _0x5efdd9.camera.setCamera("minecraft:free", {
      'location': {
        'x': _0x59016a.x + (_0x29bd08.diCamHight + 3.07),
        'y': _0x59016a.y + (_0x29bd08.diCamHight + 2.8),
        'z': _0x59016a.z - (_0x29bd08.diCamHight + 3.07)
      },
      'facingEntity': _0x5efdd9,
      'easeOptions': {
        'easeTime': 0.25,
        'easeType': EasingType[_0xa7d8e2]
      }
    });
  }, 1);
  callbackIds.set(_0x5efdd9.id, _0xe0713b);
}
function dimetricCamE(_0x3043f5) {
  const _0x2160cf = moreCamData.get(_0x3043f5.id);
  const _0x5d2bfa = new ModalFormData().title("Settings").slider("Select distance", 1, 10, 1, _0x2160cf.diCamHight).dropdown("Select Ease Type", easeTypes, _0x2160cf.diCamEaseType);
  _0x5d2bfa.show(_0x3043f5).then(_0x1992ee => {
    if (_0x1992ee.canceled) {
      _0x3043f5.sendMessage("Please Click Submit");
      dimetricCam(_0x3043f5);
      return;
    }
    _0x2160cf.diCamHight = _0x1992ee.formValues[0];
    _0x2160cf.diCamEaseType = _0x1992ee.formValues[1];
    dimetricCam(_0x3043f5);
    saveData(_0x3043f5);
  })["catch"](_0x7f9beb => {
    console.error("Error showing settings form:", _0x7f9beb);
  });
}
function dimetricCamReset(_0x2474bc) {
  const _0x5cb05b = moreCamData.get(_0x2474bc.id);
  _0x5cb05b.diCamHight = 4;
  _0x5cb05b.diCamEaseType = 0;
  saveData(_0x2474bc);
}
function trimetricCam(_0x405c4d) {
  let _0x281af9 = new ActionFormData();
  _0x281af9.title("Trimetric Camera");
  _0x281af9.button("Trimetric NW");
  _0x281af9.button("Trimetric NE");
  _0x281af9.button("Trimetric SE");
  _0x281af9.button("Trimetric SW");
  _0x281af9.button("Reset Settings");
  _0x281af9.button("Settings");
  _0x281af9.button("<«« Go Back");
  _0x281af9.body("Made By §6DarkBlock Gaming");
  const _0x2e5752 = {
    0x0: () => trimetricCamA(_0x405c4d),
    0x1: () => trimetricCamB(_0x405c4d),
    0x2: () => trimetricCamC(_0x405c4d),
    0x3: () => trimetricCamD(_0x405c4d),
    0x4: () => trimetricCamE(_0x405c4d),
    0x5: () => trimetricCamReset(_0x405c4d),
    0x6: () => MoreCamPers(_0x405c4d)
  };
  _0x281af9.show(_0x405c4d).then(_0x52f25e => {
    if (_0x52f25e.selection in _0x2e5752) {
      _0x2e5752[_0x52f25e.selection]();
    }
  })["catch"](_0x174ea3 => {
    console.error(_0x174ea3);
  });
}
function trimetricCamA(_0x2cb23c) {
  const _0x1c0cbe = camStateMap.get(_0x2cb23c.id);
  const _0x3de5aa = moreCamData.get(_0x2cb23c.id);
  hatJamc(_0x2cb23c);
  _0x1c0cbe.state = "trimetricCam";
  const _0x19ee6a = system.runInterval(() => {
    const _0x55cb30 = easeTypes[_0x3de5aa.triCamEaseType];
    const _0x53ac9d = _0x2cb23c.location;
    _0x2cb23c.camera.setCamera("minecraft:free", {
      'location': {
        'x': _0x53ac9d.x + (_0x3de5aa.triCamHight + 3.07),
        'y': _0x53ac9d.y + (_0x3de5aa.triCamHight + 4.66),
        'z': _0x53ac9d.z + (_0x3de5aa.triCamHight + 1)
      },
      'facingEntity': _0x2cb23c,
      'easeOptions': {
        'easeTime': 0.25,
        'easeType': EasingType[_0x55cb30]
      }
    });
  }, 1);
  callbackIds.set(_0x2cb23c.id, _0x19ee6a);
}
function trimetricCamB(_0x2ea232) {
  const _0x2385d0 = camStateMap.get(_0x2ea232.id);
  const _0x438611 = moreCamData.get(_0x2ea232.id);
  _0x2385d0.state = "trimetricCam";
  hatJamc(_0x2ea232);
  const _0x21ca24 = system.runInterval(() => {
    const _0x206d24 = easeTypes[_0x438611.triCamEaseType];
    const _0x133aea = _0x2ea232.location;
    _0x2ea232.camera.setCamera("minecraft:free", {
      'location': {
        'x': _0x133aea.x - (_0x438611.triCamHight + 3.07),
        'y': _0x133aea.y + (_0x438611.triCamHight + 4.66),
        'z': _0x133aea.z + (_0x438611.triCamHight + 1)
      },
      'facingEntity': _0x2ea232,
      'easeOptions': {
        'easeTime': 0.25,
        'easeType': EasingType[_0x206d24]
      }
    });
  }, 1);
  callbackIds.set(_0x2ea232.id, _0x21ca24);
}
function trimetricCamC(_0x394b9a) {
  const _0x439787 = camStateMap.get(_0x394b9a.id);
  const _0xe42caf = moreCamData.get(_0x394b9a.id);
  _0x439787.state = "trimetricCam";
  hatJamc(_0x394b9a);
  const _0x181563 = system.runInterval(() => {
    const _0x471705 = easeTypes[_0xe42caf.triCamEaseType];
    const _0x2d2696 = _0x394b9a.location;
    _0x394b9a.camera.setCamera("minecraft:free", {
      'location': {
        'x': _0x2d2696.x - (_0xe42caf.triCamHight + 3.07),
        'y': _0x2d2696.y + (_0xe42caf.triCamHight + 4.66),
        'z': _0x2d2696.z - (_0xe42caf.triCamHight + 1)
      },
      'facingEntity': _0x394b9a,
      'easeOptions': {
        'easeTime': 0.25,
        'easeType': EasingType[_0x471705]
      }
    });
  }, 1);
  callbackIds.set(_0x394b9a.id, _0x181563);
}
function trimetricCamD(_0x26395f) {
  const _0x7f0016 = camStateMap.get(_0x26395f.id);
  const _0x3d0ddb = moreCamData.get(_0x26395f.id);
  _0x7f0016.state = "trimetricCam";
  hatJamc(_0x26395f);
  const _0x5b92e9 = system.runInterval(() => {
    const _0x2c4e4c = easeTypes[_0x3d0ddb.triCamEaseType];
    const _0x168067 = _0x26395f.location;
    _0x26395f.camera.setCamera("minecraft:free", {
      'location': {
        'x': _0x168067.x + (_0x3d0ddb.triCamHight + 3.07),
        'y': _0x168067.y + (_0x3d0ddb.triCamHight + 4.66),
        'z': _0x168067.z - (_0x3d0ddb.triCamHight + 1)
      },
      'facingEntity': _0x26395f,
      'easeOptions': {
        'easeTime': 0.25,
        'easeType': EasingType[_0x2c4e4c]
      }
    });
  }, 1);
  callbackIds.set(_0x26395f.id, _0x5b92e9);
}
function trimetricCamE(_0x47a761) {
  const _0x366d8d = moreCamData.get(_0x47a761.id);
  const _0x52c170 = new ModalFormData().title("Settings").slider("Select distance", 1, 10, 1, _0x366d8d.triCamHight).dropdown("Select Ease Type", easeTypes, _0x366d8d.triCamEaseType);
  _0x52c170.show(_0x47a761).then(_0x2697b3 => {
    if (_0x2697b3.canceled) {
      _0x47a761.sendMessage("Please Click Submit");
      trimetricCam(_0x47a761);
      return;
    }
    _0x366d8d.triCamHight = _0x2697b3.formValues[0];
    _0x366d8d.triCamEaseType = _0x2697b3.formValues[1];
    trimetricCam(_0x47a761);
    saveData(_0x47a761);
  })["catch"](_0xd86424 => {
    console.error("Error showing settings form:", _0xd86424);
  });
}
function trimetricCamReset(_0xd263d) {
  const _0x150254 = moreCamData.get(_0xd263d.id);
  _0x150254.triCamHight = 4;
  _0x150254.triCamEaseType = 0;
  saveData(_0xd263d);
}
function sideViewCam(_0x4e90bc) {
  let _0x56a32e = new ActionFormData();
  _0x56a32e.title("2D/SideView Camera");
  _0x56a32e.button("2d SideView N");
  _0x56a32e.button("2d SideView S");
  _0x56a32e.button("2d SideView E");
  _0x56a32e.button("2d SideView W");
  _0x56a32e.button("Settings");
  _0x56a32e.button("Reset Settings");
  _0x56a32e.button("<«« Go Back");
  _0x56a32e.body("Made By §6DarkBlock Gaming");
  const _0x36527e = {
    0x0: () => sideViewCamA(_0x4e90bc),
    0x1: () => sideViewCamB(_0x4e90bc),
    0x2: () => sideViewCamC(_0x4e90bc),
    0x3: () => sideViewCamD(_0x4e90bc),
    0x4: () => sideViewCamE(_0x4e90bc),
    0x5: () => sideViewCamReset(_0x4e90bc),
    0x6: () => MoreCamPers(_0x4e90bc)
  };
  _0x56a32e.show(_0x4e90bc).then(_0x24689e => {
    if (_0x24689e.selection in _0x36527e) {
      _0x36527e[_0x24689e.selection]();
    }
  })["catch"](_0x3c214d => {
    console.error(_0x3c214d);
  });
}
function sideViewCamA(_0x3c4b74) {
  const _0x24ecee = camStateMap.get(_0x3c4b74.id);
  const _0x3c6577 = moreCamData.get(_0x3c4b74.id);
  _0x24ecee.state = "sideViewCam";
  hatJamc(_0x3c4b74);
  const _0x3a026e = system.runInterval(() => {
    const _0x1c6f5f = easeTypes[_0x3c6577.sideCamEaseType];
    const _0x320e31 = _0x3c4b74.location;
    _0x3c4b74.camera.setCamera("minecraft:free", {
      'location': {
        'x': _0x320e31.x,
        'y': _0x320e31.y + 1.8,
        'z': _0x320e31.z + _0x3c6577.sideCamHight
      },
      'rotation': {
        'x': 0x0,
        'y': 0xb4
      },
      'easeOptions': {
        'easeTime': 0.3,
        'easeType': EasingType[_0x1c6f5f]
      }
    });
  }, 1);
  callbackIds.set(_0x3c4b74.id, _0x3a026e);
}
function sideViewCamB(_0x15a4af) {
  const _0x13865b = camStateMap.get(_0x15a4af.id);
  const _0x41adab = moreCamData.get(_0x15a4af.id);
  _0x13865b.state = "sideViewCam";
  hatJamc(_0x15a4af);
  const _0x50ffa6 = system.runInterval(() => {
    const _0x42b1c9 = _0x15a4af.location;
    const _0x1b4ef8 = easeTypes[_0x41adab.sideCamEaseType];
    _0x15a4af.camera.setCamera("minecraft:free", {
      'location': {
        'x': _0x42b1c9.x,
        'y': _0x42b1c9.y + 1.8,
        'z': _0x42b1c9.z - _0x41adab.sideCamHight
      },
      'rotation': {
        'x': 0x0,
        'y': 0x0
      },
      'easeOptions': {
        'easeTime': 0.3,
        'easeType': EasingType[_0x1b4ef8]
      }
    });
  }, 1);
  callbackIds.set(_0x15a4af.id, _0x50ffa6);
}
function sideViewCamC(_0x28bb37) {
  const _0x3286ad = camStateMap.get(_0x28bb37.id);
  const _0x2722de = moreCamData.get(_0x28bb37.id);
  _0x3286ad.state = "sideViewCam";
  hatJamc(_0x28bb37);
  const _0x2c0def = system.runInterval(() => {
    const _0xa43bac = _0x28bb37.location;
    const _0x275b03 = easeTypes[_0x2722de.sideCamEaseType];
    _0x28bb37.camera.setCamera("minecraft:free", {
      'location': {
        'x': _0xa43bac.x - _0x2722de.sideCamHight,
        'y': _0xa43bac.y + 1.8,
        'z': _0xa43bac.z
      },
      'rotation': {
        'x': 0x0,
        'y': -90
      },
      'easeOptions': {
        'easeTime': 0.3,
        'easeType': EasingType[_0x275b03]
      }
    });
  }, 1);
  callbackIds.set(_0x28bb37.id, _0x2c0def);
}
function sideViewCamD(_0x147fb4) {
  const _0x5d2cff = camStateMap.get(_0x147fb4.id);
  const _0x113ada = moreCamData.get(_0x147fb4.id);
  _0x5d2cff.state = "sideViewCam";
  hatJamc(_0x147fb4);
  const _0xd0ef95 = system.runInterval(() => {
    const _0x52b131 = _0x147fb4.location;
    const _0x1ba8ad = easeTypes[_0x113ada.sideCamEaseType];
    _0x147fb4.camera.setCamera("minecraft:free", {
      'location': {
        'x': _0x52b131.x + _0x113ada.sideCamHight,
        'y': _0x52b131.y + 1.8,
        'z': _0x52b131.z
      },
      'rotation': {
        'x': 0x0,
        'y': 0x5a
      },
      'easeOptions': {
        'easeTime': 0.3,
        'easeType': EasingType[_0x1ba8ad]
      }
    });
  }, 1);
  callbackIds.set(_0x147fb4.id, _0xd0ef95);
}
function sideViewCamE(_0x1beeed) {
  const _0x381f37 = moreCamData.get(_0x1beeed.id);
  const _0x1a57f4 = new ModalFormData().title("Settings").slider("Select distance", 2, 20, 2, _0x381f37.sideCamHight).dropdown("Select Ease Type", easeTypes, _0x381f37.sideCamEaseType);
  _0x1a57f4.show(_0x1beeed).then(_0x4fa377 => {
    if (_0x4fa377.canceled) {
      _0x1beeed.sendMessage("Please Click Submit");
      sideViewCam(_0x1beeed);
      return;
    }
    _0x381f37.sideCamHight = _0x4fa377.formValues[0];
    _0x381f37.sideCamEaseType = _0x4fa377.formValues[1];
    sideViewCam(_0x1beeed);
    saveData(_0x1beeed);
  })["catch"](_0x25a62e => {
    console.error("Error showing settings form:", _0x25a62e);
  });
}
function sideViewCamReset(_0x3d3a8e) {
  const _0x14650f = moreCamData.get(_0x3d3a8e.id);
  _0x14650f.sideCamHight = 12;
  _0x14650f.sideCamEaseType = 0;
  saveData(_0x3d3a8e);
}