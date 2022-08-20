const { Client, Location, List, Buttons, LocalAuth  } = require('whatsapp-web.js');

const qrcode = require('qrcode-terminal');
const fs = require('fs');
const SESSION_FILE_PATH = './session.json';
let sessionData;
if(fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH);
}
const client = new Client({
    puppeteer: {
      executablePath: '/usr/bin/brave-browser-stable',
    },
    authStrategy: new LocalAuth({
      clientId: "client-one"
    }),
    puppeteer: {
      headless: true,
    }
});
client.initialize();
client.on('loading_screen', (percent, message) => {
    console.log('LOADING SCREEN', percent, message);
});
client.on('qr', qr => {
    console.log('QR RECEIVED', qr);
    qrcode.generate(qr, {small: true});
});
client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('authenticated', (session) => {    
    console.log(session);
});
 

client.on('message', async  msg => {
    // console.log(msg);
    // function sleep(ms) {
    //     return new Promise(resolve => setTimeout(resolve, ms));
    //   }
    if (msg.body == '!ping') {
        client.sendMessage(msg.from,'pong');
        msg.react('👍');
    }

    if (msg.body === '!buttons') {
        let button = new Buttons('Button body',[{body:'bt1'},{body:'bt2'}],'title','footer');
        client.sendMessage(msg.from, button);
    }

    let chat = await msg.getChat();
      if (! chat.isGroup  &&  (msg.type=="video" || msg.type=="image") ) {
         const receivedImage = await msg.downloadMedia();
         client.sendMessage(msg.from, receivedImage, { sendMediaAsSticker: true,stickerAuthor:'111',stickerName:'55' });
     }
    if (msg.body === '!list') {


        const buttons_reply = new Buttons('test', [{body: 'Test', id: 'test-1'}], 'title', 'footer') // Reply button

const buttons_reply_url = new Buttons('test', [{body: 'Test', id: 'test-1'}, {body: "Test 2", url: "https://wwebjs.dev"}], 'title', 'footer') // Reply button with URL

const buttons_reply_call = new Buttons('test', [{body: 'Test', id: 'test-1'}, {body: "Test 2 Call", url: "+1 (234) 567-8901"}], 'title', 'footer') // Reply button with call button

const buttons_reply_call_url = new Buttons('test', [{body: 'Test', id: 'test-1'}, {body: "Test 2 Call", url: "+1 (234) 567-8901"}, {body: 'Test 3 URL', url: 'https://wwebjs.dev'}], 'title', 'footer') // Reply button with call button & url button

const section = {
  title: 'test',
  rows: [
    {
      title: 'Test 1',
    },
    {
      title: 'Test 2',
      id: 'test-2'
    },
    {
      title: 'Test 3',
      description: 'This is a smaller text field, a description'
    },
    {
      title: 'Test 4',
      description: 'This is a smaller text field, a description',
      id: 'test-4',
    }
  ],
};


const list1 = new List('test', 'click me', [section], 'title', 'footer')
await client.sendMessage(msg.from, buttons_reply_call_url);
await client.sendMessage(msg.from, buttons_reply);
await client.sendMessage(msg.from, buttons_reply_url);
await client.sendMessage(msg.from, buttons_reply_call);
await client.sendMessage(msg.from, list1);


        let sections = [{title:'sectionTitle',rows:[{title:'ListItem1', description: 'desc'},{title:'ListItem2'}]}];
        let list = new List('List body','btnText',sections,'Title','footer');
        client.sendMessage(msg.from, list);
    }


    if (msg.body === '!delete') {
        if (msg.hasQuotedMsg) {
            
            const quotedMsg = await msg.getQuotedMessage();
            if (quotedMsg.timestamp == 'undefined') {
                msg.reply('I can only delete');
            }else{

            if (quotedMsg.fromMe) {
                quotedMsg.delete(true);
            } else {
                msg.reply('I can only delete my own messages');

            }
        }

        }
    } 


    if (msg.body === '!t') {
        const chat = await msg.getChat();
        // simulates typing in the chat
        chat.sendStateTyping(5);
        // await sleep(5);
        // chat.clearState();


    } 

    if (msg.body === '!ss') {
        const chat = await msg.getChat();
        // simulates typing in the chat
        chat.sendSeen();
    } 
     if (msg.body === '!r') {
        const chat = await msg.getChat();
        // simulates recording audio in the chat
        chat.sendStateRecording(5);
        // chat.clearState();
    }
});



// client.on('message_create', (msg) => {
//     // Fired on all message creations, including your own
//     if (msg.fromMe) {
//         // do stuff here
//     console.log(msg);

//     }
// });



// client.on('message_revoke_everyone', async (after, before) => {
//     // Fired whenever a message is deleted by anyone (including you)
//     console.log(after); // message after it was deleted.
//     if (before) {
//         console.log(before); // message before it was deleted.
//     }
// });


client.on('BATTERY_CHANGED', (msg) => {

    // client.sendMessage(msg.from, list);
        console.log(msg);

});

client.on('MessageTypes', (msg) => {

    console.log(msg);

});


client.on('message_ack', (msg, ack) => {
    /*
        == ACK VALUES ==
        ACK_ERROR: -1
        ACK_PENDING: 0
        ACK_SERVER: 1
        ACK_DEVICE: 2
        ACK_READ: 3
        ACK_PLAYED: 4
    */

    if(ack == 3) {
        // The message was read
        // console.log(msg);
        // msg.reply('// The message was read');
    }
});
