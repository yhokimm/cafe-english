'use strict';
const line=(en,pron,ko,value)=>({en,pron,ko,...(value?{value}:{})});
const DRINKS={coffee:['coffee','커피','커피'],latte:['latte','라테','라테'],tea:['tea','티','차']};
const drinkAnswers=()=>Object.entries(DRINKS).map(([key,[en,pr,ko]])=>line(`I'd like a ${en}, please.`,`아이드 라이크 어 ${pr}, 플리즈.`,`${ko} 한 잔 주세요.`,key));
const MISSION_DATA=[
 {id:'order',title:'음료 한 잔 주문하기',desc:'커피, 라테, 차 중 골라 보세요',icon:'01',goal:'원하는 음료를 주문하고 인사해요.',steps:[
 {q:line('Hello! What would you like?','헬로! 왓 우드 유 라이크?','안녕하세요! 무엇을 드시겠어요?'),key:'drink',answers:drinkAnswers()},
 {q:line('Hot or iced?','핫 오어 아이스트?','따뜻한 것으로 드릴까요, 차가운 것으로 드릴까요?'),key:'temperature',answers:[line('Hot, please.','핫, 플리즈.','따뜻한 것으로 주세요.','hot'),line('Iced, please.','아이스트, 플리즈.','차가운 것으로 주세요.','iced')]},
 {q:line('For here or to go?','포어 히어 오어 투 고?','매장에서 드시나요, 포장하시나요?'),key:'place',answers:[line('For here, please.','포어 히어, 플리즈.','매장에서 마실게요.','here'),line('To go, please.','투 고, 플리즈.','포장해 주세요.','go')]},
 {q:line('Anything else?','애니씽 엘스?','더 필요한 것이 있나요?'),answers:[line("That's all, thank you.",'댓츠 올, 땡큐.','이게 전부예요. 감사합니다.'),line('No, thank you.','노, 땡큐.','아니요, 괜찮습니다.')]},
 {q:line('Here you are. Enjoy!','히어 유 아. 인조이!','여기 있습니다. 맛있게 드세요!'),answers:[line('Thank you!','땡큐!','감사합니다!'),line('Thanks. Have a nice day!','땡크스. 해브 어 나이스 데이!','감사합니다. 좋은 하루 보내세요!')]}
 ]},
 {id:'custom',title:'크기와 온도 고르기',desc:'작은 잔부터 큰 잔까지, 내 취향대로',icon:'02',goal:'음료의 크기와 온도를 말해요.',steps:[
 {q:line('What can I get for you?','왓 캔 아이 겟 포어 유?','무엇을 드릴까요?'),key:'drink',answers:drinkAnswers()},
 {q:line('What size would you like?','왓 사이즈 우드 유 라이크?','어떤 크기로 드릴까요?'),key:'size',answers:[line('Small, please.','스몰, 플리즈.','작은 것으로 주세요.','small'),line('Medium, please.','미디엄, 플리즈.','중간 크기로 주세요.','medium'),line('Large, please.','라지, 플리즈.','큰 것으로 주세요.','large')]},
 {q:line('Would you like it hot or iced?','우드 유 라이크 잇 핫 오어 아이스트?','따뜻한 것과 차가운 것 중 어떤 것으로 드릴까요?'),key:'temperature',answers:[line('Hot, please.','핫, 플리즈.','따뜻한 것으로 주세요.','hot'),line('Iced, please.','아이스트, 플리즈.','차가운 것으로 주세요.','iced')]},
 {q:state=>{const d=DRINKS[state.drink||'coffee'];const sizes={small:['small','스몰','작은'],medium:['medium','미디엄','중간 크기의'],large:['large','라지','큰']};const s=sizes[state.size||'small'];const iced=state.temperature==='iced';return line(`A ${s[0]} ${iced?'iced':'hot'} ${d[0]}. Is that right?`,`어 ${s[1]} ${iced?'아이스트':'핫'} ${d[1]}. 이즈 댓 라이트?`,`${s[2]} ${iced?'차가운':'따뜻한'} ${d[2]} 맞으시죠?`);},answers:[line("Yes, that's right. Thank you.",'예스, 댓츠 라이트. 땡큐.','네, 맞아요. 감사합니다.'),line('Yes, please.','예스, 플리즈.','네, 그렇게 주세요.')]},
 {q:line('Your drink will be ready soon.','유어 드링크 윌 비 레디 순.','음료가 곧 준비됩니다.'),answers:[line('Thank you.','땡큐.','감사합니다.'),line("Great, thank you. I'll wait here.",'그레이트, 땡큐. 아일 웨이트 히어.','좋아요, 감사합니다. 여기서 기다릴게요.')]}
 ]},
 {id:'pay',title:'포장하고 결제하기',desc:'가져갈 음료를 주문하고 카드로 결제해요',icon:'03',goal:'포장을 부탁하고 결제해요. 가격은 연습용입니다.',steps:[
 {q:line('Hi! What would you like to order?','하이! 왓 우드 유 라이크 투 오더?','안녕하세요! 무엇을 주문하시겠어요?'),key:'drink',answers:drinkAnswers()},
 {q:line('For here or to go?','포어 히어 오어 투 고?','매장에서 드시나요, 포장하시나요?'),answers:[line('To go, please.','투 고, 플리즈.','포장해 주세요.'),line("I'd like it to go, please.",'아이드 라이크 잇 투 고, 플리즈.','포장하고 싶어요.')]},
 {q:line("That's four dollars, please.",'댓츠 포어 달러즈, 플리즈.','4달러입니다.'),answers:[line('Can I pay by card?','캔 아이 페이 바이 카드?','카드로 결제할 수 있나요?'),line("I'd like to pay by card.",'아이드 라이크 투 페이 바이 카드.','카드로 결제하고 싶어요.')]},
 {q:line('Sure. Please tap your card here.','슈어. 플리즈 탭 유어 카드 히어.','네. 여기에 카드를 대 주세요.'),answers:[line('Okay. Could I have a receipt, please?','오케이. 쿠드 아이 해브 어 리싯, 플리즈?','네. 영수증을 받을 수 있을까요?'),line('Okay. A receipt, please.','오케이. 어 리싯, 플리즈.','네. 영수증 주세요.')]},
 {q:line('Here is your receipt. Have a nice day!','히어 이즈 유어 리싯. 해브 어 나이스 데이!','여기 영수증입니다. 좋은 하루 보내세요!'),answers:[line('Thank you. You too!','땡큐. 유 투!','감사합니다. 좋은 하루 보내세요!'),line('Thanks. Goodbye!','땡크스. 굿바이!','감사합니다. 안녕히 계세요!')]}
 ]}
];
const HELP_LINES=[line('Please speak slowly.','플리즈 스피크 슬로울리.','천천히 말씀해 주세요.'),line('Could you say that again?','쿠드 유 세이 댓 어겐?','다시 말씀해 주시겠어요?'),line("I don't understand.",'아이 돈트 언더스탠드.','이해하지 못했어요.')];
