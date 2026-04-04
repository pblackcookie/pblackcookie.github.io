(() => {
  'use strict';

  const cryptoObj = window.crypto || window.msCrypto;
  const storage = window.localStorage;

  const storageName = 'hexo-blog-encrypt:#' + window.location.pathname;
  const keySalt = textToArray('hexo-blog-encrypt的作者们都是大帅比!');
  const ivSalt = textToArray('hexo-blog-encrypt是地表最强Hexo加密插件!');

// As we can't detect the wrong password with AES-CBC,
// so adding an empty div and check it when decrption.
const knownPrefix = "<hbe-prefix></hbe-prefix>";

  const mainElement = document.getElementById('hexo-blog-encrypt');
  const wrongPassMessage = mainElement.dataset['wpm'];
  const wrongHashMessage = mainElement.dataset['whm'];
  const dataElement = mainElement.getElementsByTagName('script')['hbeData'];
  const encryptedData = dataElement.innerText;
  const HmacDigist = dataElement.dataset['hmacdigest'];

  function hexToArray(s) {
    return new Uint8Array(s.match(/[\da-f]{2}/gi).map((h => {
      return parseInt(h, 16);
    })));
  }

  function textToArray(s) {
    var i = s.length;
    var n = 0;
    var ba = new Array()

    for (var j = 0; j < i;) {
      var c = s.codePointAt(j);
      if (c < 128) {
        ba[n++] = c;
        j++;
      } else if ((c > 127) && (c < 2048)) {
        ba[n++] = (c >> 6) | 192;
        ba[n++] = (c & 63) | 128;
        j++;
      } else if ((c > 2047) && (c < 65536)) {
        ba[n++] = (c >> 12) | 224;
        ba[n++] = ((c >> 6) & 63) | 128;
        ba[n++] = (c & 63) | 128;
        j++;
      } else {
        ba[n++] = (c >> 18) | 240;
        ba[n++] = ((c >> 12) & 63) | 128;
        ba[n++] = ((c >> 6) & 63) | 128;
        ba[n++] = (c & 63) | 128;
        j += 2;
      }
    }
    return new Uint8Array(ba);
  }

  function arrayBufferToHex(arrayBuffer) {
    if (typeof arrayBuffer !== 'object' || arrayBuffer === null || typeof arrayBuffer.byteLength !== 'number') {
      throw new TypeError('Expected input to be an ArrayBuffer')
    }

    var view = new Uint8Array(arrayBuffer)
    var result = ''
    var value

    for (var i = 0; i < view.length; i++) {
      value = view[i].toString(16)
      result += (value.length === 1 ? '0' + value : value)
    }

    return result
  }

  async function getExecutableScript(oldElem) {
    let out = document.createElement('script');
    const attList = ['type', 'text', 'src', 'crossorigin', 'defer', 'referrerpolicy'];
    attList.forEach((att) => {
      if (oldElem[att])
        out[att] = oldElem[att];
    })

    return out;
  }

  async function convertHTMLToElement(content) {
    let out = document.createElement('div');
    out.innerHTML = content;
    out.querySelectorAll('script').forEach(async (elem) => {
      elem.replaceWith(await getExecutableScript(elem));
    });

    return out;
  }

  function getKeyMaterial(password) {
    let encoder = new TextEncoder();
    return cryptoObj.subtle.importKey(
      'raw',
      encoder.encode(password),
      {
        'name': 'PBKDF2',
      },
      false,
      [
        'deriveKey',
        'deriveBits',
      ]
    );
  }

  function getHmacKey(keyMaterial) {
    return cryptoObj.subtle.deriveKey({
      'name': 'PBKDF2',
      'hash': 'SHA-256',
      'salt': keySalt.buffer,
      'iterations': 1024
    }, keyMaterial, {
      'name': 'HMAC',
      'hash': 'SHA-256',
      'length': 256,
    }, true, [
      'verify',
    ]);
  }

  function getDecryptKey(keyMaterial) {
    return cryptoObj.subtle.deriveKey({
      'name': 'PBKDF2',
      'hash': 'SHA-256',
      'salt': keySalt.buffer,
      'iterations': 1024,
    }, keyMaterial, {
      'name': 'AES-CBC',
      'length': 256,
    }, true, [
      'decrypt',
    ]);
  }

  function getIv(keyMaterial) {
    return cryptoObj.subtle.deriveBits({
      'name': 'PBKDF2',
      'hash': 'SHA-256',
      'salt': ivSalt.buffer,
      'iterations': 512,
    }, keyMaterial, 16 * 8);
  }

  async function verifyContent(key, content) {
    const encoder = new TextEncoder();
    const encoded = encoder.encode(content);

    let signature = hexToArray(HmacDigist);

    const result = await cryptoObj.subtle.verify({
      'name': 'HMAC',
      'hash': 'SHA-256',
    }, key, signature, encoded);
    console.log(`Verification result: ${result}`);
    if (!result) {
      alert(wrongHashMessage);
      console.log(`${wrongHashMessage}, got `, signature, ` but proved wrong.`);
    }
    return result;
  }

  async function decrypt(decryptKey, iv, hmacKey) {
    let typedArray = hexToArray(encryptedData);

    const result = await cryptoObj.subtle.decrypt({
      'name': 'AES-CBC',
      'iv': iv,
    }, decryptKey, typedArray.buffer).then(async (result) => {
      const decoder = new TextDecoder();
      const decoded = decoder.decode(result);

      // check the prefix, if not then we can sure here is wrong password.
      if (!decoded.startsWith(knownPrefix)) {
        throw "Decode successfully but not start with KnownPrefix.";
      }

      const hideButton = document.createElement('button');
      hideButton.textContent = 'Encrypt again';
      hideButton.type = 'button';
      hideButton.classList.add("hbe-button");
      hideButton.addEventListener('click', () => {
        window.localStorage.removeItem(storageName);
        window.location.reload();
      });

      document.getElementById('hexo-blog-encrypt').style.display = 'inline';
      document.getElementById('hexo-blog-encrypt').innerHTML = '';
      document.getElementById('hexo-blog-encrypt').appendChild(await convertHTMLToElement(decoded));
      document.getElementById('hexo-blog-encrypt').appendChild(hideButton);

      // support html5 lazyload functionality.
      document.querySelectorAll('img').forEach((elem) => {
        if (elem.getAttribute("data-src") && !elem.src) {
          elem.src = elem.getAttribute('data-src');
        }
      });

      // support theme-next refresh
      window.NexT && NexT.boot && typeof NexT.boot.refresh === 'function' && NexT.boot.refresh();

      // TOC part
      var tocDiv = document.getElementById("toc-div");
      if (tocDiv) {
        tocDiv.style.display = 'inline';
      }

      var tocDivs = document.getElementsByClassName('toc-div-class');
      if (tocDivs && tocDivs.length > 0) {
        for (var idx = 0; idx < tocDivs.length; idx++) {
          tocDivs[idx].style.display = 'inline';
        }
      }
      
      // trigger event
      var event = new Event('hexo-blog-decrypt');
      window.dispatchEvent(event);

      return await verifyContent(hmacKey, decoded);
    }).catch((e) => {
      alert(wrongPassMessage);
      console.log(e);
      return false;
    });

    return result;

  }

  function hbeLoader() {

    const oldStorageData = JSON.parse(storage.getItem(storageName));

    if (oldStorageData) {
      console.log(`Password got from localStorage(${storageName}): `, oldStorageData);

      const sIv = hexToArray(oldStorageData.iv).buffer;
      const sDk = oldStorageData.dk;
      const sHmk = oldStorageData.hmk;

      cryptoObj.subtle.importKey('jwk', sDk, {
        'name': 'AES-CBC',
        'length': 256,
      }, true, [
        'decrypt',
      ]).then((dkCK) => {
        cryptoObj.subtle.importKey('jwk', sHmk, {
          'name': 'HMAC',
          'hash': 'SHA-256',
          'length': 256,
        }, true, [
          'verify',
        ]).then((hmkCK) => {
          decrypt(dkCK, sIv, hmkCK).then((result) => {
            if (!result) {
              storage.removeItem(storageName);
            }
          });
        });
      });
    }

    mainElement.addEventListener('keydown', async (event) => {
      if (event.isComposing || event.keyCode === 13) {
        const password = document.getElementById('hbePass').value;
        const keyMaterial = await getKeyMaterial(password);
        const hmacKey = await getHmacKey(keyMaterial);
        const decryptKey = await getDecryptKey(keyMaterial);
        const iv = await getIv(keyMaterial);

        decrypt(decryptKey, iv, hmacKey).then((result) => {
          console.log(`Decrypt result: ${result}`);
          if (result) {
            cryptoObj.subtle.exportKey('jwk', decryptKey).then((dk) => {
              cryptoObj.subtle.exportKey('jwk', hmacKey).then((hmk) => {
                const newStorageData = {
                  'dk': dk,
                  'iv': arrayBufferToHex(iv),
                  'hmk': hmk,
                };
                storage.setItem(storageName, JSON.stringify(newStorageData));
              });
            });
          }
        });
      }
    });

    // 添加提交按钮 - 适配移动端（增强版）
const passwordInput = document.getElementById('hbePass');
if (passwordInput && !document.querySelector('.hbe-submit-button')) {
  
  // 检查 Web Crypto API 可用性
  if (!cryptoObj || !cryptoObj.subtle) {
    console.warn('当前浏览器不支持 Web Crypto API，加密功能不可用');
    const warningMsg = document.createElement('div');
    warningMsg.textContent = '您的浏览器不支持文章解密功能，请使用现代浏览器（Chrome/Safari/Edge）访问';
    warningMsg.style.cssText = 'color: red; padding: 10px; text-align: center; background: #ffeeee; margin: 10px 0; border-radius: 4px;';
    passwordInput.parentNode.insertAdjacentElement('afterend', warningMsg);
    return; // 直接退出，不创建按钮
  }
  
  // 创建提交按钮
  const submitButton = document.createElement('button');
  submitButton.textContent = '提交密码';
  submitButton.type = 'button';
  submitButton.className = 'hbe-button hbe-submit-button';
  submitButton.style.cssText = 'margin-top: 12px; width: 60%; text-align: center; text-indent: 0; display: block; margin-left: auto; margin-right: auto; padding: 8px 16px; background-color: #4a4a4a; color: white; border: none; border-radius: 4px; cursor: pointer;';
  
  // 将按钮插入到密码框后面
  const inputContainer = passwordInput.closest('.hbe-input');
  if (inputContainer) {
    inputContainer.insertAdjacentElement('afterend', submitButton);
  } else {
    passwordInput.insertAdjacentElement('afterend', submitButton);
  }
  
  // 密码预处理函数
  function sanitizePassword(password) {
    return password ? password.trim().replace(/\s+/g, '') : '';
  }
  
  // 为按钮添加点击事件（移动端优化版）
  const handleDecrypt = async () => {
    // 防止重复点击
    if (submitButton.disabled) return;
    
    const originalText = submitButton.textContent;
    const password = sanitizePassword(document.getElementById('hbePass').value);
    
    if (!password) {
      alert('请输入密码');
      return;
    }
    
    // 视觉反馈
    submitButton.textContent = '解密中...';
    submitButton.disabled = true;
    
    try {
      // 再次确认 API 可用
      if (!cryptoObj || !cryptoObj.subtle) {
        throw new Error('浏览器不支持解密所需的 Web Crypto API');
      }
      
      console.log('开始生成密钥材料...');
      const keyMaterial = await getKeyMaterial(password);
      
      console.log('开始派生 HMAC 密钥...');
      const hmacKey = await getHmacKey(keyMaterial);
      
      console.log('开始派生解密密钥...');
      const decryptKey = await getDecryptKey(keyMaterial);
      
      console.log('开始派生 IV...');
      const iv = await getIv(keyMaterial);
      
      console.log('开始解密...');
      const result = await decrypt(decryptKey, iv, hmacKey);
      
      console.log(`解密结果: ${result}`);
      
      if (result) {
        // 保存密钥到 localStorage
        const [dk, hmk] = await Promise.all([
          cryptoObj.subtle.exportKey('jwk', decryptKey),
          cryptoObj.subtle.exportKey('jwk', hmacKey)
        ]);
        
        const newStorageData = {
          'dk': dk,
          'iv': arrayBufferToHex(iv),
          'hmk': hmk,
        };
        storage.setItem(storageName, JSON.stringify(newStorageData));
        console.log('密钥已保存，页面即将刷新解密内容');
      } else {
        // 解密失败，恢复按钮
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }
    } catch (error) {
      console.error('解密过程出错:', error);
      alert('解密失败: ' + (error.message || '密码错误或浏览器不支持'));
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }
  };
  
  // 绑定点击事件（同时支持 click 和 touchend）
  submitButton.addEventListener('click', handleDecrypt);
  submitButton.addEventListener('touchend', function(e) {
    e.preventDefault();
    handleDecrypt();
  });
  
  console.log('✅ 移动端提交按钮已添加，Web Crypto API 可用性:', !!(cryptoObj && cryptoObj.subtle));
}
  }

  hbeLoader();

})();
