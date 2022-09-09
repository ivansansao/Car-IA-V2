class Genetic {

    constructor() {
        this.gotCloserBest = 0;
        this.recordCloser = 0;
        this.quantidade = 4;
        this.pesos = '';
        this.shapes = '';
        this.melhor = null;
        this.melhorCorrente = null;
        this.pesos = [];
        this.shapes = '22,8;8;8,9;9';

        // Sem pista.
        this.pesos.push('');

        // Pista 1
        this.pesos.push('-0.16185849905014038,-0.04437238723039627,-1.3237130641937256,0.2876213788986206,-0.385092556476593,0.19724732637405396,0.1237185001373291,-0.06338256597518921,0.2453538477420807,-0.6997166872024536,1.410857081413269,0.32246139645576477,1.199432611465454,-0.4128447473049164,0.32923924922943115,-1.3065760135650635,0.15168942511081696,-0.07108508795499802,-0.17661991715431213,0.07175277173519135,0.23320171236991882,-0.272798627614975,0.7646384835243225,0.09415274113416672,0.06807831674814224,-0.3031100928783417,-0.11551899462938309,-0.020972825586795807,0.30205807089805603,-0.07269393652677536,-0.3349117040634155,0.2952057123184204,-0.47856825590133667,-0.13946513831615448,-0.6110274195671082,1.520184874534607,0.1623045802116394,0.19997701048851013,-0.8235505223274231,0.033160462975502014,0.33578619360923767,1.188737154006958,0.06884343177080154,1.3037086725234985,-0.09796760231256485,-0.12444498389959335,0.28243428468704224,0.5909421443939209,-0.1317303478717804,0.16166268289089203,0.35642683506011963,0.6080654263496399,-0.2894786298274994,-0.09969548135995865,-0.18787556886672974,-0.37247076630592346,0.12478846311569214,-0.9267023205757141,-0.08800050616264343,-0.2457096129655838,-0.12772005796432495,1.0642482042312622,-0.1620897650718689,0.4621514081954956,0.31308260560035706,-0.5343852639198303,-0.3469054400920868,-1.3564386367797852,0.004182605538517237,1.1538372039794922,0.18082450330257416,0.15190252661705017,0.11375369131565094,-0.506252646446228,-0.22739747166633606,-0.07488903403282166,-0.2785661518573761,0.8099858164787292,-0.035846829414367676,0.3080045282840729,0.1827273815870285,-0.6243537664413452,-0.018771793693304062,0.09771919250488281,-0.19458718597888947,-0.07943561673164368,0.24004529416561127,0.8611940145492554,-0.30244868993759155,1.3452447652816772,-0.12320582568645477,0.10487211495637894,0.21837569773197174,0.3406694531440735,-0.1392998844385147,0.2525820732116699,0.23607337474822998,0.3305451571941376,-0.37945234775543213,-0.25492599606513977,0.0682314857840538,-0.46676093339920044,-0.06115955859422684,-0.4739043712615967,0.3452170193195343,-0.31325408816337585,-0.2805209457874298,0.10767737030982971,0.13166068494319916,-0.5030214786529541,-0.0898054987192154,-0.327277272939682,0.41069135069847107,0.0333954393863678,-0.4944550693035126,-0.8328852653503418,0.3848859369754791,0.2575017511844635,0.23008418083190918,0.07410398870706558,0.49757274985313416,0.15810371935367584,0.23505420982837677,-0.572344183921814,0.15884074568748474,-0.10238425433635712,0.042895808815956116,0.33252835273742676,0.1521066427230835,-0.22623111307621002,0.26244229078292847,-0.08588148653507233,-2.720733642578125,-0.2699497938156128,-0.27051666378974915,0.1024727150797844,-0.08318343013525009,0.395197331905365,0.263071745634079,0.39213696122169495,0.29767268896102905,0.10573217272758484,0.7926983833312988,-0.3940197825431824,-0.024865301325917244,-0.32865607738494873,-0.9364618062973022,0.9848143458366394,-1.1595020294189453,0.18676576018333435,-0.019511492922902107,-1.5564467906951904,0.5025249123573303,-1.9183756113052368,0.08134669065475464,-0.5244364738464355,-0.22849886119365692,1.9314978122711182,0.19902153313159943,0.34307563304901123,-0.0020182060543447733,0.057369414716959,0.20125624537467957,-0.3094848394393921,0.27771198749542236,2.1878111362457275,-0.30896443128585815,-0.2018854320049286,0.2460600882768631,-0.1404835730791092,0.15096627175807953,-0.21715256571769714,2.1105048656463623,-0.0990428626537323,-0.02979367785155773,-0.06040643900632858;0,1.2993333339691162,0,-1.5122278928756714,-3.310288667678833,0,1.565291404724121,-0.26443052291870117;-0.9202674627304077,-0.2863459885120392,-0.20264552533626556,0.37124788761138916,0.9039772152900696,-0.9439395666122437,0.46519309282302856,-0.1224612444639206,0.6786810755729675,-1.3760827779769897,0.6986674070358276,0.30998435616493225,-1.4794461727142334,1.0476666688919067,-0.05415308475494385,0.3334486484527588,-0.5312850475311279,0.14023225009441376,-0.00895486120134592,1.935012936592102,0.563092827796936,-1.198738932609558,-1.1154136657714844,-0.3081356883049011,-0.310271292924881,1.5010926723480225,0.026366086676716805,-0.7110133767127991,-0.21397684514522552,1.2848334312438965,-0.6263017654418945,-0.43540990352630615,-2.2851455211639404,0.030620375648140907,0.7560316920280457,-0.1556524783372879,0.6402912139892578,1.818588137626648,0.33993232250213623,0.020111655816435814,-0.37478020787239075,0.8221223950386047,-0.1130407378077507,0.004149127285927534,-0.28086555004119873,1.3128257989883423,-0.744111955165863,0.16395674645900726,0.24335120618343353,1.2483513355255127,-0.552593469619751,-0.24164238572120667,-0.5527985692024231,0.09523453563451767,0.04384663328528404,0.03494676947593689,0.2000545859336853,-0.11365890502929688,-0.5390766263008118,-2.1367790699005127,-0.22851604223251343,1.5211632251739502,0.5813907384872437,-0.19258499145507812,-0.7726640105247498,-0.0587097704410553,-0.3092118501663208,0.9197566509246826,-1.4028240442276,0.4037737548351288,-0.3005206286907196,-0.6232607960700989;-0.1824028640985489,0,-1.6631824970245361,0,1.1417511701583862,0.7440764904022217,-1.6099988222122192,0.5921221971511841,1.3984278440475464');

        // Pista 2
        this.pesos.push('-2.4192075729370117,8.182243347167969,0.5442622900009155,-6.140575408935547,0.4206228256225586,2.7349050045013428,4.630753517150879,-0.6961246728897095,-7.064025402069092,-3.615494966506958,5.327238082885742,8.21973991394043,12.160561561584473,6.434757709503174,3.8161814212799072,-9.83089542388916,0.8075110912322998,-1.799641489982605,-2.2885003089904785,3.279257297515869,-0.538351833820343,-2.4368999004364014,-2.9236724376678467,-0.8597813844680786,2.6236801147460938,-1.5598013401031494,-0.207014799118042,-3.706418514251709,-0.6826674938201904,-1.754015564918518,-1.173404335975647,3.268315553665161,1.7201176881790161,-1.8787360191345215,0.2887868285179138,-1.5907528400421143,4.183285713195801,-2.5443835258483887,0.2951774299144745,-1.356708288192749,0.7968617677688599,-1.0559546947479248,2.030855417251587,1.6894570589065552,5.86276912689209,1.3819571733474731,-0.40822672843933105,1.4084171056747437,3.389523506164551,0.2756412625312805,-4.597484111785889,5.026951313018799,-2.6440727710723877,2.1333396434783936,-0.7020979523658752,4.02582311630249,0.7193115949630737,-1.114093542098999,2.882164478302002,-0.46436429023742676,4.365649700164795,-3.64459228515625,-0.5398236513137817,-0.104686439037323,-0.10365145653486252,0.37523749470710754,-1.0363348722457886,-2.230616807937622,-6.446892738342285,3.006122589111328,2.2769572734832764,2.4815313816070557,-1.8639678955078125,2.1212069988250732,-2.141017436981201,-1.0317680835723877,2.2875654697418213,-4.664955139160156,4.615339279174805,-2.1570091247558594,-2.0857930183410645,0.6297704577445984,-2.2249131202697754,0.9029141068458557,2.806877851486206,-1.7808696031570435,-0.014595190063118935,1.2778747081756592,0.7978623509407043,0.16915617883205414,-2.070997476577759,1.408298134803772,2.0987308025360107,0.4597729742527008,-1.0191364288330078,-3.2658371925354004,-1.1492551565170288,-0.05397077649831772,-1.3401035070419312,-4.6000075340271,-1.568723201751709,-0.18402762711048126,1.7192434072494507,0.5124384760856628,1.4119502305984497,0.8926913142204285,-2.2706472873687744,-0.30392882227897644,2.792546272277832,0.18334494531154633,4.394244194030762,-3.6284313201904297,-1.3406952619552612,0.5560107827186584,-0.20066656172275543,-3.440345525741577,-0.5925673246383667,-1.3029134273529053,-0.42705824971199036,0.6543610095977783,1.534157156944275,1.6049244403839111,-0.9062820672988892,0.32132071256637573,-0.9135532975196838,-0.3545471429824829,3.192783832550049,-0.5482421517372131,-3.459582567214966,1.300764560699463,2.7899205684661865,-1.6017160415649414,-4.44159460067749,1.8422117233276367,0.4554879367351532,-1.2267303466796875,1.0295562744140625,-10.74340534210205,1.4747543334960938,-1.263993740081787,-2.54407000541687,0.6086298227310181,1.1236733198165894,0.7933060526847839,-0.6329255700111389,1.4530467987060547,1.2524008750915527,-1.716599464416504,0.5707257986068726,1.3894702196121216,3.6639347076416016,1.620762825012207,-1.774304986000061,1.4316701889038086,6.010383129119873,-0.33660802245140076,0.4240100681781769,1.7513656616210938,-4.141974925994873,-0.005382290575653315,0.4650399088859558,0.7817758321762085,1.602437973022461,-0.11828815937042236,-1.3563001155853271,-3.2335331439971924,1.9778404235839844,-2.52626633644104,7.93501091003418,2.2306859493255615,-0.4139915704727173,1.913044810295105,-4.632047653198242,-0.01023808028548956,0.8145769238471985,3.4126434326171875;-4.380833625793457,-1.0396734476089478,8.596367835998535,-4.247039318084717,-3.561387300491333,-2.301881790161133,8.935622215270996,-10.350349426269531;1.4622783660888672,-1.554909586906433,2.8908629417419434,-2.5088553428649902,-4.723893165588379,1.3659271001815796,2.232787609100342,-4.699016571044922,3.005829095840454,-0.0425502248108387,3.67881178855896,-0.6406979560852051,-1.1354975700378418,14.283556938171387,-0.42210641503334045,-3.680598258972168,-0.537732720375061,-0.047276247292757034,-1.62543785572052,4.656002998352051,1.1198076009750366,6.764243125915527,1.0370272397994995,2.4542152881622314,-4.33735990524292,-5.454133987426758,2.5352582931518555,1.409523844718933,0.3782668113708496,-1.0625498294830322,2.1447768211364746,-6.228434085845947,2.613476514816284,-3.594196081161499,0.7448059916496277,-1.8097072839736938,1.7169702053070068,3.8751578330993652,1.8226251602172852,2.5254554748535156,13.588454246520996,-9.010255813598633,8.17443561553955,0.7215270400047302,1.3731422424316406,1.2697679996490479,-3.886284828186035,1.4951881170272827,2.2791264057159424,-6.167548656463623,10.41020393371582,-0.2671548128128052,-1.8352407217025757,-0.24437987804412842,-4.518568992614746,1.699565052986145,-3.330554485321045,-6.371518135070801,-3.9081461429595947,0.9419687390327454,-3.1386733055114746,-0.7309856414794922,2.6501903533935547,-0.8472462892532349,-2.7031145095825195,0.24860215187072754,-1.5141404867172241,-5.116081714630127,2.604485511779785,-0.2431344985961914,1.6032639741897583,1.486116886138916;-3.8123278617858887,-10.742483139038086,11.983295440673828,-8.730507850646973,-11.98171615600586,-1.348229169845581,9.812987327575684,-2.246934652328491,4.881857395172119');

        // Pista 3 3 dias de treino conseguiu dar a volta. 1146
        this.pesos.push('1.7479526996612549,3.3772287368774414,0.7005923390388489,-0.05608475208282471,-1.3558566570281982,1.454259991645813,-0.22098572552204132,0.6195513606071472,0.08819231390953064,4.325881004333496,2.3144702911376953,0.6273193955421448,-0.8213363885879517,2.253314733505249,-2.913139581680298,1.6922681331634521,-0.5486811995506287,-0.13610967993736267,0.16486762464046478,-0.8290215730667114,-1.5775628089904785,-0.011424906551837921,-0.643483579158783,-0.007668179925531149,0.05484018474817276,0.31735870242118835,0.02587611973285675,-0.1117280125617981,-1.3013806343078613,-0.47171059250831604,-1.518649935722351,0.09672115743160248,1.3274797201156616,-0.17575106024742126,0.6493120789527893,0.6897537708282471,-0.3130420446395874,0.8817152976989746,-0.68528813123703,-1.0458221435546875,1.3171517848968506,-3.632964849472046,-0.3898075819015503,0.9846222996711731,1.1739628314971924,1.2899582386016846,-0.020082084462046623,-1.182587742805481,-1.9415663480758667,0.8900938034057617,-0.20326019823551178,-0.05337204784154892,-0.15117081999778748,1.1475558280944824,0.2004869133234024,-0.6314815878868103,0.6847473382949829,-0.6161296367645264,1.0339791774749756,-0.020540321245789528,0.18262962996959686,0.14441359043121338,-0.5498229265213013,-1.3016630411148071,0.4780113399028778,-1.6612062454223633,-0.31420406699180603,-0.942568302154541,-0.6778862476348877,0.21417202055454254,-1.0536365509033203,1.4567961692810059,-0.18337221443653107,-0.08408510684967041,-0.8469411134719849,-1.013727068901062,0.9234182834625244,1.3076540231704712,-0.9746222496032715,0.2344059944152832,1.605248212814331,-0.40485459566116333,0.3177157938480377,-0.5119832754135132,0.378024160861969,-0.20123295485973358,0.12042344361543655,-0.06688317656517029,0.07144952565431595,-0.6274488568305969,-0.27774274349212646,-0.218927264213562,1.145168423652649,0.1421506404876709,1.221480131149292,0.29551073908805847,-0.6916189789772034,-0.39176493883132935,0.2783479690551758,0.7913298010826111,0.2001747339963913,0.23634421825408936,0.38834887742996216,-0.4023599922657013,-0.890005886554718,-2.8295645713806152,0.2174185961484909,-0.3465447723865509,0.16688817739486694,-0.7166265845298767,-0.10180824249982834,0.23599018156528473,0.4464564025402069,0.03794560208916664,0.22259950637817383,-3.299773693084717,0.3294631242752075,-0.1929997056722641,-0.29346615076065063,1.4783276319503784,-0.4490848481655121,-0.5530824065208435,0.779869019985199,0.7974951863288879,-0.17255575954914093,0.519158124923706,-0.07616438716650009,-0.43975257873535156,0.9542723298072815,-0.2153337001800537,-0.09493837505578995,-1.62615168094635,0.7038032412528992,-0.804975688457489,2.077723741531372,1.5111457109451294,0.9114229083061218,-0.3587701916694641,0.49721962213516235,1.0190558433532715,-0.35753679275512695,-0.1977338194847107,-0.6200626492500305,0.4523347020149231,0.10369447618722916,1.6845771074295044,-1.5663162469863892,0.4363076090812683,1.1765552759170532,-0.7257341742515564,-0.5305442214012146,-1.492690086364746,1.3063876628875732,-1.462575912475586,-0.0684361532330513,0.4428396224975586,-0.09250064939260483,-1.6821056604385376,1.9146337509155273,-1.5892010927200317,-1.1193867921829224,-0.002752932719886303,-1.1286299228668213,0.4432060420513153,0.28514131903648376,-0.15610714256763458,0.28671377897262573,-0.34473544359207153,-2.2148396968841553,0.09437154233455658,-0.2757589817047119,1.6784626245498657,-0.25865045189857483,-3.529001474380493,1.1483749151229858,-0.18759043514728546;0.1862463504076004,-2.8309452533721924,-0.18924719095230103,-1.4462600946426392,-0.7397555708885193,1.0271002054214478,3.3993959426879883,-0.8147074580192566;-1.1165344715118408,-4.398859024047852,-0.23999187350273132,-1.0391837358474731,-5.208813190460205,-15.15455436706543,-0.5236417055130005,2.1650896072387695,-0.40915828943252563,-0.8569592833518982,1.8156391382217407,-0.46589282155036926,9.193480491638184,11.341639518737793,-2.8856375217437744,0.09447804093360901,6.347075462341309,0.46220192313194275,0.09166659414768219,-4.140368461608887,-0.5642883777618408,0.40393736958503723,3.579186201095581,-15.896981239318848,0.8805463910102844,-2.76025128364563,-2.983337879180908,-1.6275745630264282,0.5295390486717224,1.060189962387085,0.19657498598098755,-2.9052574634552,10.036348342895508,-0.39920347929000854,1.2079499959945679,-0.07951429486274719,-0.38571521639823914,-1.075729489326477,0.6164482235908508,1.7499427795410156,1.6783174276351929,-6.718963623046875,0.9855950474739075,1.5181891918182373,-0.5718217492103577,-0.36232954263687134,3.3095662593841553,-0.5260023474693298,2.0206165313720703,4.717685699462891,11.279200553894043,2.183363914489746,-2.267765760421753,-2.2354559898376465,0.43208643794059753,-1.5236274003982544,0.31777289509773254,0.9353671669960022,10.350372314453125,0.44137728214263916,0.08319546282291412,3.268336772918701,1.8950269222259521,0.2770864963531494,1.899266004562378,0.5708152055740356,0.7923135161399841,9.246103286743164,-8.993470191955566,-2.4011194705963135,18.083093643188477,0.22922012209892273;-4.024435520172119,-4.33273983001709,1.0125490427017212,3.509948492050171,15.464614868164062,-1.5637081861495972,0.789084792137146,-2.5224602222442627,1.141216516494751');

        // Pista 4 3738-3734-3730-3728
        this.pesos.push('-2.995163917541504,7.621369361877441,1.8609973192214966,6.205726623535156,-5.486969470977783,-2.5810134410858154,5.706925868988037,-5.387656211853027,-1.9360980987548828,-1.8258417844772339,2.5976576805114746,-3.333784580230713,2.317612409591675,0.5112963318824768,2.7169957160949707,-8.596864700317383,0.5793452858924866,-0.32670846581459045,-1.1355748176574707,-0.24465692043304443,-0.37908732891082764,0.30313190817832947,-0.7573069930076599,0.318501353263855,-0.23606827855110168,0.22452904284000397,-0.3737708032131195,0.1523585170507431,-0.3589590787887573,-0.14938755333423615,-0.22297002375125885,0.5883488655090332,1.4553759098052979,-1.8587827682495117,-0.9622200131416321,-2.6326887607574463,1.9361040592193604,-0.5284411311149597,-0.3415735065937042,-0.6072123050689697,-1.2076873779296875,-0.429836243391037,0.42754247784614563,0.6566322445869446,2.278407573699951,0.5872686505317688,-0.10301085561513901,-1.2570194005966187,-0.6116492748260498,-0.9625096917152405,-0.15630260109901428,3.3248753547668457,-3.577117443084717,2.2925610542297363,-1.1217745542526245,2.279114246368408,-0.7006319761276245,0.24022959172725677,0.4555419087409973,1.5676263570785522,-0.7709817886352539,-1.5435478687286377,0.06691833585500717,2.204658269882202,-0.5597350001335144,-0.6863908767700195,-1.1504175662994385,-0.9467366337776184,-1.4880462884902954,1.1624679565429688,0.9040341377258301,2.0498268604278564,0.1079510971903801,-0.13846567273139954,0.33123987913131714,0.6228606700897217,-0.8772175312042236,0.054953210055828094,0.3144873380661011,-0.9461321830749512,0.7854970097541809,0.062016624957323074,-0.2932884693145752,0.4156580865383148,0.3570345938205719,0.7083648443222046,0.056515004485845566,-0.17672523856163025,-0.16184473037719727,0.8658655881881714,-0.1897699385881424,1.0507620573043823,-0.6305519342422485,-0.8928956985473633,0.37072473764419556,-0.7237340211868286,-0.333040326833725,-0.0794963613152504,-0.025533156469464302,0.3679727017879486,-1.055118203163147,0.25219011306762695,-0.10282435268163681,0.053461719304323196,0.21548523008823395,1.722424030303955,-0.025030631572008133,-0.5257530212402344,1.2158701419830322,0.35039955377578735,1.0268430709838867,-1.3581334352493286,-0.2567732036113739,-0.7064469456672668,0.6805242896080017,-0.4641839861869812,0.289409875869751,0.16802486777305603,-0.13240817189216614,0.27614709734916687,-3.5315659046173096,-0.20771370828151703,-0.34901073575019836,-0.6653072237968445,-0.8960375785827637,-0.01865844801068306,-0.08590131253004074,-1.2575643062591553,0.12340762466192245,-0.016403906047344208,0.32249942421913147,-0.8112295269966125,-0.7139349579811096,0.2545366883277893,2.2310030460357666,-0.08871468901634216,-0.33974483609199524,-3.811225652694702,0.3337973654270172,0.35276666283607483,-1.5976358652114868,0.2567663788795471,0.06429137289524078,0.3559480905532837,0.05332044139504433,0.038528237491846085,0.25882935523986816,0.5435043573379517,-0.14189064502716064,0.06480046361684799,1.037889838218689,0.8237220048904419,-0.5923480987548828,2.00319504737854,0.8059912919998169,-0.3394058644771576,0.25993961095809937,1.3710111379623413,-0.38694506883621216,-2.597959518432617,0.37231704592704773,1.7940735816955566,0.6982812285423279,0.08517961204051971,-0.9153608679771423,-0.33282729983329773,0.5783155560493469,0.5129078030586243,1.3075145483016968,-0.06833295524120331,-0.32227814197540283,0.6463634967803955,-2.934711217880249,0.022703753784298897,0.862972617149353,1.9775853157043457;0.45913606882095337,-6.3827338218688965,2.186380386352539,4.989715576171875,3.4066009521484375,-0.15077842772006989,4.0146403312683105,4.717402935028076;-1.317972183227539,-2.1652677059173584,1.5443379878997803,-0.5000386834144592,9.06201457977295,-12.773433685302734,1.2803099155426025,0.2106866091489792,0.33229419589042664,-1.839990258216858,1.4383761882781982,-0.12963664531707764,0.19024676084518433,23.153812408447266,1.48360013961792,-5.306936264038086,0.28625619411468506,-0.10467525571584702,-1.4026272296905518,0.838847279548645,-0.22699043154716492,0.9850816130638123,-4.347310543060303,4.738719463348389,-4.23143196105957,-1.8928396701812744,1.3781195878982544,-0.6295878291130066,1.6836919784545898,-0.9824831485748291,0.5945031046867371,-10.62697982788086,-2.6413064002990723,-4.974001884460449,0.2044970989227295,-0.1252327263355255,-0.2206614464521408,1.8150030374526978,-0.26979580521583557,-0.1625031679868698,29.38555335998535,-16.18760871887207,6.314815998077393,-0.3134223520755768,-0.1372402161359787,-0.39596715569496155,-4.099324703216553,-0.17043806612491608,0.04767432436347008,5.356118202209473,-7.162519454956055,-1.2973157167434692,-0.05267972871661186,0.46630391478538513,-1.4343675374984741,1.0033410787582397,-2.5081217288970947,1.7550891637802124,-6.690016746520996,-2.9414734840393066,0.6397393941879272,-2.423793077468872,-0.053003910928964615,-0.03444952890276909,-3.0354270935058594,-2.5952205657958984,-0.49835020303726196,-12.207894325256348,7.623300075531006,-0.6775587201118469,-0.48919838666915894,-0.04976518452167511;-9.047222137451172,-2.865173578262329,0.9911074042320251,-3.521752119064331,-10.297691345214844,-14.749506950378418,37.223819732666016,12.508395195007324,5.604760646820068');

        // Pista 5
        this.pesos.push('0.26264384388923645,-0.2248823642730713,0.4104709327220917,-0.26587235927581787,0.3490575850009918,-0.39163950085639954,0.12259615212678909,-0.3866935074329376,-0.42024457454681396,0.2857610881328583,0.8645992875099182,-0.0677105262875557,0.011375084519386292,-0.8975483775138855,-0.16079093515872955,0.4106284976005554,-0.17184363305568695,1.0370593070983887,0.12429357320070267,0.16218101978302002,-0.0025575614999979734,0.7136989831924438,0.19876456260681152,-0.5781612396240234,-0.6491377353668213,0.36004260182380676,0.16328586637973785,0.11875446140766144,-0.10688193887472153,1.2237746715545654,-0.09656310081481934,-1.6121563911437988,2.812725782394409,-0.3390829861164093,0.7462557554244995,-0.07478600740432739,0.3756572902202606,0.13392429053783417,0.7142283320426941,0.3482201099395752,0.171987846493721,0.27967536449432373,-0.25145986676216125,0.19116376340389252,0.43886619806289673,-0.0014847679995000362,-0.2666916251182556,-0.13780945539474487,-1.158336877822876,-0.04550580307841301,0.4345242977142334,0.23650510609149933,0.0892387181520462,0.09701575338840485,-0.3240014910697937,1.9812124967575073,0.28046944737434387,-0.4913449287414551,-0.3700881600379944,-2.478785514831543,0.49005603790283203,-0.8930944204330444,0.10148978978395462,-0.02701873891055584,-0.020834026858210564,-0.986239492893219,0.1696774661540985,0.12601427733898163,0.05599410831928253,-0.15428029000759125,-0.24524465203285217,0.8355938196182251,0.9573392868041992,-1.9266300201416016,-0.04831754416227341,-0.40453413128852844,-0.025362392887473106,0.08290476351976395,-0.18714097142219543,1.2581748962402344,-2.9447388648986816,-0.059992291033267975,0.1617758870124817,0.3706623613834381,-0.022846616804599762,0.1970614194869995,0.10893082618713379,-0.10176021605730057,-0.23901022970676422,0.19707044959068298,0.2645987272262573,0.5839200019836426,0.15646085143089294,0.4327167272567749,0.04389844462275505,-1.2656440734863281,-0.34875521063804626,0.34276795387268066,0.04240313917398453,0.13944688439369202,-0.15751470625400543,0.15182264149188995,0.3642091453075409,1.1396199464797974,-0.7945265173912048,0.12771202623844147,-0.2457515299320221,0.24794316291809082,-0.19284677505493164,0.23098626732826233,-0.2838391661643982,-0.12507414817810059,-0.3929949700832367,-0.862851619720459,0.5770540833473206,0.09783920645713806,0.1106395348906517,-0.38403981924057007,-0.15904851257801056,1.5317108631134033,0.9838640689849854,-0.1410718858242035,-0.19085943698883057,-0.4187534749507904,-0.4234347343444824,0.3133249282836914,0.40266042947769165,0.19691982865333557,-0.25567108392715454,-0.19797249138355255,-1.7224093675613403,-0.010345354676246643,0.23473642766475677,0.025976108387112617,0.5869455933570862,-0.29194965958595276,0.04239928349852562,0.5601049661636353,-0.015405764803290367,-0.18983213603496552,0.038434527814388275,-0.021426763385534286,-0.5806084871292114,-0.29347583651542664,-0.2179899364709854,-0.007360851392149925,-0.5942792892456055,0.1886412799358368,-2.3484046459198,-0.24366725981235504,-2.5361175537109375,0.04018377885222435,0.011708583682775497,0.8860054612159729,-0.05972641333937645,-0.2669426202774048,0.25456392765045166,-0.32437267899513245,-0.9231393337249756,0.009672325104475021,0.4303830564022064,-0.42780575156211853,0.1151570975780487,0.29491114616394043,-0.21946601569652557,-0.36752358078956604,1.3093494176864624,0.16737300157546997,-0.6072037816047668,0.23868289589881897,0.15602119266986847,0.35736557841300964,-0.3047082722187042,-0.4885641932487488,-0.37578633427619934,1.3865278959274292;0,-2.284705638885498,0,-1.7471345663070679,0,-1.4301660060882568,0,2.539656639099121;-1.1178237199783325,2.229137897491455,0.20508606731891632,0.3041532635688782,-0.45473021268844604,0.08674914389848709,0.6518391370773315,-0.14668966829776764,1.0436586141586304,-0.24654650688171387,-0.5472851991653442,-0.41154733300209045,0.5088735222816467,-0.36610540747642517,0.1691952645778656,0.2608500123023987,0.44885683059692383,0.3630208373069763,3.188413619995117,0.04889487475156784,0.23460105061531067,0.3855609893798828,-0.04978611692786217,1.7515822649002075,0.3524959683418274,-0.45382824540138245,-1.6322845220565796,-0.8174835443496704,0.24437367916107178,0.04751458019018173,-0.15517041087150574,0.13593639433383942,-0.17284247279167175,-0.1945033222436905,-0.28715381026268005,0.3755475878715515,-0.5417128205299377,0.3839554786682129,-0.26116442680358887,-0.4979479908943176,-0.5970050692558289,0.2465270608663559,-0.41389769315719604,0.02247706986963749,0.46889039874076843,0.5254200100898743,0.5964738726615906,-1.2302076816558838,0.4549117088317871,-0.09733645617961884,0.5257800817489624,-0.24951507151126862,-0.05756426230072975,-0.3478344976902008,0.18194209039211273,-0.2726486325263977,1.27130925655365,0.06282922625541687,-0.29803234338760376,0.3262384831905365,-0.8678346872329712,-0.6451218724250793,-0.15887068212032318,-0.35411834716796875,-0.5905461311340332,0.24487300217151642,0.009749396704137325,0.009869375266134739,-0.5271385312080383,0.26509425044059753,0.1877528727054596,0.2794197201728821;0,0,0,0,-0.041771452873945236,0,0.44573432207107544,-1.0951014757156372,0');

        // Pista 6
        this.pesos.push('');
    }

    firstGeneration() {

        cars = [];

        // Novos
        for (let i = 0; i < quantidade; i++) {
            cars.push(new Car());
        }

        let child = new Car('X');
        let pesos;
        if (pesosForcados != undefined) {
            pesos = this.pesos[pesosForcados];
            console.log(`Pesos da pista ${pesosForcados}`);
        } else {
            pesos = this.pesos[pista.selectedPista];
        }

        if (pesos.length > 0) {
            if (world.startWeightSaved) {
                child.ia.setWeightsFromString(pesos, this.shapes);
            }
        }
        cars.push(child);
        this.melhor = child;

        vivos = cars.length;

    }

    nextGeneration() {

        pista.reset();

        this.calcColocacao();

        if (colocacao.length == 0) {
            this.firstGeneration();
            return

        }

        const lastMelhor = this.melhor;
        
        this.melhor = this.getMelhorCarro();
        this.gotCloserBest = this.getGotCloserBest();
        
        if (this.gotCloserBest > this.recordCloser) {
            this.recordCloser = this.gotCloserBest;            
            // console.log('Pesos utilizados na corriga anterior:');
            // console.log(lastMelhor.ia.showWeights());
        }

        if (!this.melhor) {
            return
        }
        this.saveWeights(this.melhor);
        
        console.log(`G${addZero(nGeracao + 1)} (${getHourMin()}) km: ${this.melhor.km} M: ${this.melhor.marca} Q: ${this.melhor.timer} R: ${this.melhor.ranhurasColetadas.length} Perto: ${addZero(this.gotCloserBest)} Muts: ${this.melhor.ia.mutated} NM: ${this.melhor.ia.mutatedNeurons}`);
        
        //  f1: ${this.melhor.ia.f1} f2: ${this.melhor.ia.f2} 

        if (this.melhor.ranhurasColetadas.length > record) {
            foo.speak(`Atingiu ${this.melhor.ranhurasColetadas.length}!`);
            record = this.melhor.ranhurasColetadas.length;
        }

        if (this.melhor.km < pista.recordKm || this.melhor.ranhurasColetadas.length > pista.recordRanhuras) {

            pista.recordKm = this.melhor.km;
            pista.recordRanhuras = this.melhor.ranhurasColetadas.length;

            if (nGeracao > 0) {
                foo.speak(`quilômetro ${pista.recordKm.toFixed(0)}!`);
            }
            this.melhor.ia.showWeights();
        }

        // pista.pistaTimeOut = ceil(this.melhor.aliveTime *1.1);

        evolucao.push(this.melhor);

        nGeracao++;
        hue = 0;

        cars = [];

        const weights = this.melhor.ia.model.getWeights();

        const weightCopies = [];
        for (let i = 0; i < weights.length; i++) {
            weightCopies[i] = weights[i].clone();
        }

        // Clonado e mutado.
        for (let i = 1; i < (quantidade / 3) * 0; i++) {

            let child = new Car('m');
            child.ia.model.setWeights(weightCopies);
            child.ia.mutate(0.1,1); // 0.1
            cars.push(child);

        }

        // Clonado e mutado.
        for (let i = 1; i < (quantidade / 3) * 3; i++) {

            let child = new Car('T');
            child.ia.model.setWeights(weightCopies);
            child.ia.mutate(0.05); // 0.1
            cars.push(child);

        }

        // Clonado (elitismo)
        if (elitism) {

            let child = new Car('c');
            child.ia.model.setWeights(weightCopies);
            cars.push(child);
        }

        vivos = cars.length;

    }

    setFlag() {

        if (pista) {
            const tmpMelhor = genetic.getMelhorCarro();
            if (tmpMelhor) {
                pista.setFlag(tmpMelhor.pos.x, tmpMelhor.pos.y, tmpMelhor.km);
                this.melhorCorrente = tmpMelhor;
            }
        }

    }

    getQuemMaisDeuReh(qtd) {

        console.log(`Primeiro: ${colocacao[0].km}`);

        let maiorReh = 0;
        let maiorI = 0;

        for (let i = 0; i < min(qtd, colocacao.length); i++) {

            car = colocacao[i];

            console.log(`${i}:  ${colocacao[i].km} -> ${colocacao[i].qtdReh}`);

            if (car.km > 0) {
                if (myRelu(colocacao[i].qtdReh) > maiorReh) {

                    maiorReh = myRelu(colocacao[i].qtdReh);
                    maiorI = i;
                }
            }
        }

        console.log('******* Maior ré é ->', colocacao[maiorI].qtdReh, ' km ', colocacao[maiorI].km, ' i: ', maiorI);
        return colocacao[maiorI];

    }

    getGotCloserBest() {

        let qtd = 0;

        if (this.melhor) {            
            for (const car of cars) {
                if (this.melhor.id != car.id) {
                    if (abs(this.melhor.km - car.km) < 100) {
                        qtd++;
                    }
                }
            }
        }

        return qtd;

    }

    getMelhorCarro() {

        
        let melhor = null;
        let km = Infinity;
        let maisRanhuras = 0;
        let lap = 0;
        let maisMuts = 0;

        // Seleciona a maior volta.
        for (const car of cars) {
            if (car.lap > lap) {
                lap = car.lap;
            }
        }

        // Mais perto do final da pista

        for (const car of cars) {

            if (car.km > 0 && car.lap == lap) {
                if (car.km < km && car.timer < pista.pistaTimeOut) {
                    km = car.km;
                    melhor = car;
                }
            }
        }

        // Carros com mais mutações.

        for (const car of cars) {

            if (car.km == km && car.lap == lap) {
                if (car.ia.mutated > maisMuts) {
                    maisMuts = car.ia.mutated;
                    melhor = car;                    
                }
                
            }
        }

        if (false) {
            
            for (const car of cars) {
    
                if (car.ranhurasColetadas.length > maisRanhuras) {
                    maisRanhuras = car.ranhurasColetadas.length;
                    melhor = car;
                }
            }
    
            if (maisRanhuras < 7 && pista.selectedPista == 2) {

                // Se empate, verifica desses qual tem melhor ângulo.

                let maiorHea = 0;

                for (const car of cars) {
                    if (car.ranhurasColetadas.length == maisRanhuras) {
                        if (car.heading > maiorHea) {
                            maiorHea = car.heading;
                            melhor = car;
                        }
                    }
                }

            } else {

                // Se empate, verifica desses qual tem melhor km.

                let maisKm = Infinity;

                for (const car of cars) {
                    if (car.ranhurasColetadas.length == maisRanhuras) {
                        if (car.km > 0) {
                            if (car.km < maisKm) {
                                maisKm = car.km;
                                melhor = car;
                            }
                        }
                    }
                }
            }
        }

        //  // Se empate, soteia um.
        //  for (const car of cars) {
        //      if (car.ranhurasColetadas.length == maisRanhuras) {
        //          if (random(1) > 0.5) {
        //              melhor = car;
        //              break;
        //          }
        //      }
        //  }

        // console.log('Mais KM() -> ', this.melhor.km, ' maisRanhuras: ', maisRanhuras, ' maisKm: ', maisKm);
        // fill(0,0,255);
        // circle(this.melhor.pos.x,this.melhor.pos.y,8);
        // noLoop();


        return melhor;
    }

    funcSalvarMelhorCarro(melhor) {
        if (salvarMelhorCarro) {
            // localStorage.setItem('meuGato', 'Tom');

            // document.cookie = "username=ivan; expires=Thu, 18 Dec 2025 12:00:00 UTC; path=/";

            // try {
            //     console.log('Salvando carro... ', this.melhor.marca);
            //     await this.melhor.ia.model.save('indexeddb://caria-melhor');
            //     console.log('Salvo');
            //     // await this.melhor.ia.model.save('localstorage://caria-melhor');
            // } catch (err) {
            //     console.error(err);
            // }
        }
    }

    funcCarregarCarroSalvo() {
        if (carregarCarroSalvo) {
            // console.log(' leitura: ',localStorage.getItem('meuGato'));
            // console.log('cookie => ',document.cookie);
            // try {

            //     console.log('Carregando carro salvo...');
            //     const melhorSalvo = await tf.loadLayersModel('indexeddb://caria-melhor');

            //     let child = new Car('X');
            //     child.ia.model = null;
            //     child.ia.model = melhorSalvo
            //     cars.push(child);

            // } catch (err) {
            //     console.error(err);
            // }
            // melhorCarregado = true;
            // console.log('Carregado!')
        }

    }
    saveWeights(car) {
        const w = car.ia.showWeights(true);
        localStorage.setItem('melhor', w);
    }

    calcColocacao() {
        colocacao = [];
        for (let car of cars) {
            colocacao.push(car);
        }
        if (colocacao.length > 0) {
            colocacao.sort(function (a, b) { return b.km < a.km });
        }

    }


}