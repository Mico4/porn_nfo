(() => {
    function download(filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    function downloadURI(uri, name) {
        chrome.runtime.sendMessage({
            action: 'downloadUrl',
            downObj: {
                url: uri,
                filename: name
            }
        });
        // var link = document.createElement("a");
        // link.setAttribute('download', name);
        // link.setAttribute('target', '_self');
        // link.href = uri;
        // document.body.appendChild(link);
        // link.click();
        // document.body.removeChild(link);
        // delete link;
    }

    function simples(doc, obj) {
        return Object.keys(obj).map((key) => {
            const ele = doc.createElement(key);
            ele.innerHTML = (obj[key]||'').trim().replace(/(&|<|>)+/g, 'and');
            return ele;
        })
    }

    function multiples(doc, obj) {
        return Object.keys(obj).reduce((acc, key) => {
            acc.splice(acc.length, 0, ...(obj[key].map(x => {
                const ele = doc.createElement(key);
                ele.innerHTML = x.replace(/(&|<|>)+/g, 'and').trim().toLocaleLowerCase();
                return ele;
            })));
            return acc;
        }, []);
    }

    function createNFO(obj) {
        doc = document.implementation.createDocument(null, "episodedetails");
        const lastChild = doc.lastChild;
        simples(doc, obj.simples).forEach((x) => lastChild.appendChild(x));
        multiples(doc, obj.multiples).forEach((x) => lastChild.appendChild(x));
        if (obj.actors) {
            obj.actors.map(name => {
                const act = doc.createElement('actor');
                const aname = doc.createElement('name');
                aname.innerHTML = name.toLocaleLowerCase().trim().split(/\s+/g).map(x => x.charAt(0).toLocaleUpperCase() + x.slice(1)).join(' ');
                const atype = doc.createElement('type');
                atype.innerHTML = 'Actor';
                act.appendChild(aname);
                act.appendChild(atype);
                return act
            }).forEach((x) => lastChild.appendChild(x));
        }
        const seri = new XMLSerializer();
        return `<?xml version="1.0" encoding="utf-8" standalone="yes"?>${seri.serializeToString(doc)}`;
    }

    async function teamskeettest() {
        const fecha = new Date(document.querySelector('.movie__meta__row time').innerText).toISOString().slice(0, 10);
        const title = document.querySelector('.movie-details__h1').innerText;
        const nfo = createNFO({
            simples: {
                title,
                plot: document.querySelector('.movie-description').innerText,
                year: fecha.slice(0, 4),
                aired: fecha,
            },
            multiples: {
                tag: Array.prototype.map.call(document.querySelectorAll('.tag-list-container > .mpjs-select-tag'), x => x.innerText),
                studio: [getsite(), document.querySelector('.movie__meta .site-name').innerText],
            },
            actors: Array.prototype.map.call(document.querySelectorAll('.movie__meta .model-name'), x => x.innerText),
        });
        let todown = await navigator.clipboard.readText();
        todown = todown.match(/[^\\]+$/)[0];
        if(todown.lastIndexOf('.')>=0){
        	todown = todown.slice(0,todown.lastIndexOf('.'));
        }
        download(`${todown}.nfo`, nfo);
        // downloadURI(document.getElementById('main-movie-player').getAttribute('poster'), `${todown.replace(/ /g,'_')}.jpg`);
        downloadURI(Array.from(document.querySelectorAll('#oframemain-movie-player > pjsdiv')).find(x=>!!x.style.backgroundImage).style.backgroundImage.slice(5,-2),`${todown.replace(/ /g,'_')}.jpg`);
        return nfo;
    }

    function spyfam() {
        const fecha = new Date('August 13, 2018').toISOString().slice(0, 10);
        const title = document.querySelector('#t2019 .t2019-stitle').innerText;
        const nfo = createNFO({
            simples: {
                title,
                plot: document.querySelector('#t2019 #t2019-description').innerText,
                year: fecha.slice(0, 4),
                aired: fecha,
            },
            multiples: {
                tag: Array.prototype.map.call(document.querySelectorAll('.tag-list-container > .mpjs-select-tag'), x => x.innerText),
                studio: [getsite()],
            },
            actors: Array.prototype.map.call(document.querySelectorAll('#t2019 #t2019-models a'), x => x.innerText),
        });
        download(`${title.replace(/ /g,'_')}.nfo`, nfo);
        downloadURI(document.querySelector('.plyr__video-wrapper video').poster, `${title.replace(/ /g,'_')}.jpg`);
        return nfo;
    }
    async function realitykings() {
        const fecha = new Date(document.querySelector('.sc-1b6bgon-1.fvOIom').innerText).toISOString().slice(0, 10);
        const title = document.querySelector('.font-primary.sc-1b6bgon-2.hQvrjg').innerText;
        const plot = document.querySelector('.xnzhm0-1.kLbWwG') || document.querySelector('.xnzhm0-1.eeqEiz');
        const nfo = createNFO({
            simples: {
                title,
                plot: plot?plot.innerText:'',
                year: fecha.slice(0, 4),
                aired: fecha,
            },
            multiples: {
                tag: Array.prototype.map.call(document.querySelectorAll('a.vdkjux-0.EkOBk'), x => x.innerHTML),
                studio: [getsite(), (document.querySelector('a.vdkjux-5.iKqcjY')||{innerHTML:''}).innerHTML.toLocaleLowerCase().replace(/ /g, '')],
            },
            actors: Array.prototype.map.call(document.querySelectorAll('a.sc-1b6bgon-7.cGUerq'), x => x.innerText),
        });
        let todown = await navigator.clipboard.readText();
        todown = todown.match(/[^\\]+$/)[0];
        if(todown.lastIndexOf('.')>=0){
            todown = todown.slice(0,todown.lastIndexOf('.'));
        }
        download(`${todown.replace(/ /g,'_')}.nfo`, nfo);
        console.log(nfo);
        downloadURI(document.querySelector("div.vjs-poster").style['backgroundImage'].slice(5,-2), `${todown.replace(/ /g,'_')}.jpg`);
        return nfo;
    }

    function naughtyamerica() {
        const fecha = new Date(document.querySelector('#toogle-container .entry-date').innerText).toISOString().slice(0, 10);
        const title = document.querySelector('.scene-info .scene-title').innerText.toLocaleLowerCase();
        const nfo = createNFO({
            simples: {
                title,
                plot: document.querySelector('.scene-info .synopsis.grey-text').lastChild.data,
                year: fecha.slice(0, 4),
                aired: fecha,
            },
            multiples: {
                tag: Array.prototype.map.call(document.querySelectorAll('.scene-info .categories a'), x => x.innerHTML),
                studio: [getsite(), document.querySelector('.scene-info .site-title').innerHTML.toLocaleLowerCase().replace(/ /g, '')],
            },
            actors: Array.prototype.map.call(document.querySelectorAll('.scene-info .performer-list a'), x => x.innerText),
        });
        const todown = document.querySelector('.container .contain-start-card div video source').src.match(/\/(?<name>[0-9a-z]+)trailer_.*$/)[1];
        // const todown = title;
        download(`${todown.replace(/ /g,'_')}.nfo`, nfo);
        console.log(nfo);
        downloadURI(document.querySelector('.container .start-card').src, `${todown.replace(/ /g,'_')}.jpg`);
        return nfo;
    }

    async function familysinners() {
        // const [a, b, c] = document.querySelector('.tjb798-2.flgKJM').children;
        const arr = document.querySelector('.tjb798-2.flgKJM').children;
        let plot = '';
        let fechada = new Date();
        let tag = [];
        for(i=0;i< arr.length;i++){
        	const tit = arr[i].firstChild.innerText.trim();
			if (tit === 'Description:'){
				plot = arr[i].lastChild.innerText;
			} else if (tit==='Release Date:'){
				fechada = new Date(arr[i].lastChild.data);
			} else {
				tag = Array.prototype.map.call(arr[i].querySelectorAll('a'), x => x.innerText.slice(0, -1));
			}
		}
        const fecha = fechada.toISOString().slice(0, 10);
        const title = document.querySelector('.wxt7nk-4.fSsARZ').innerText.toLocaleLowerCase();
        const nfo = createNFO({
            simples: {
                title,
                plot,
                year: fecha.slice(0, 4),
                aired: fecha,
            },
            multiples: {
                tag,
                studio: [getsite()],
            },
            actors: Array.prototype.map.call(document.querySelectorAll('.wxt7nk-5.cWGMuL a'), x => x.innerText),
        });
        // const todown = title;
        const todown = await navigator.clipboard.readText();
        download(`${todown}.nfo`, nfo);
        console.log(nfo);
        // downloadURI(document.querySelector('.tg5e7m-1.lSdde').src, `${todown.replace(/ /g,'_')}.jpg`);
        if (document.querySelector('.tg5e7m-1.lSdde')) {
            downloadURI(document.querySelector('.tg5e7m-1.lSdde').src, `${todown}.jpg`);
        } else {
            downloadURI(document.querySelector('.bitmovinplayer-poster').style['backgroundImage'].slice(5,-2), `${todown}.jpg`);
        }
        return nfo;
    }

    function bangbros() {
        const [tags, actors, fe] = document.querySelectorAll('.thmbHldr-in .ntcw span.tag');
        const fecha = new Date(document.querySelector('.thmbHldr-in div div div span.tag a').innerText.slice(12, 24)).toISOString().slice(0, 10);
        const title = document.querySelector('.thmbHldr-in .vdo-hdd1').innerText.toLocaleLowerCase();
        const nfo = createNFO({
            simples: {
                title,
                plot: document.querySelector('.thmbHldr-in .ndcp').innerText,
                year: fecha.slice(0, 4),
                aired: fecha,
            },
            multiples: {
                tag: Array.prototype.map.call(tags.querySelectorAll('a.tagB'), x => x.innerText),
                studio: [getsite(), document.querySelector('.thmbHldr-in div div span a.url-link').innerText],
            },
            actors: Array.prototype.map.call(actors.querySelectorAll('a.tagB'), x => x.innerText),
        });
        // const todown = title;
        const todown = document.getElementById('tracking-info').getAttribute('data-shoot-code');
        download(`${todown.replace(/ /g,'_')}.nfo`, nfo);
        console.log(nfo);
        downloadURI(document.querySelector('span.olimg img').src, `${todown.replace(/ /g,'_')}.jpg`);
        return nfo;
    }

    function espera(tie) {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, tie);
        });
    }

    async function brazzers() {
        document.querySelector('button.sc-1rsnn24-3.bCNJnT').click();
        await espera(300);
        const fecha = new Date(document.querySelector('.sc-1b6bgon-1.fvOIom').innerText).toISOString().slice(0, 10);
        const title = document.querySelector('.sc-1b6bgon-2.kRSNY').innerText.toLocaleLowerCase();
        const studio =[getsite()]
        const stu = document.querySelector('.sc-1rsnn24-0.kjjpsI a.vdkjux-5.ktbPaH');
        if (stu) {
            studio.push(stu.innerText);
        }
        const nfo = createNFO({
            simples: {
                title,
                plot: (document.querySelector('.sc-1mhpkp8-0.dLQauY p.xnzhm0-1.eeqEiz')||document.querySelector('.sc-1mhpkp8-0.dLQauY .xnzhm0-1.kLbWwG')||{}).innerText,
                year: fecha.slice(0, 4),
                aired: fecha,
            },
            multiples: {
                tag: Array.prototype.map.call(document.querySelectorAll('.sc-1rsnn24-0.kjjpsI div.vdkjux-1.fRHpAa a'), x => x.innerText),
                studio: studio,
            },
            actors: Array.prototype.map.call(document.querySelectorAll('div.sc-1mhpkp8-0.jUsPJ div.sc-1b6bgon-4.keyReI a'), x => x.innerText),
        });
        // const todown = title;
        let todown = await navigator.clipboard.readText();
        todown = todown.match(/[^\\]+$/)[0];
        if(todown.lastIndexOf('.')>=0){
            todown = todown.slice(0,todown.lastIndexOf('.'));
        }
        download(`${todown}.nfo`, nfo);
        console.log(nfo);
        const alt1 = document.querySelector('.sc-1mhpkp8-3.hatDmo div.tg5e7m-2.evtSOm img');
        const imgsrc = alt1 ? alt1.src : document.querySelector("div.vjs-poster").style['backgroundImage'].slice(5,-2);
        downloadURI(imgsrc, `${todown}.jpg`);
        return nfo;
    }
    async function vixen() {
        const fecha = new Date(document.querySelector("div.gkniq1-0.bJPDVi > div > div.sc-13rgbhb-4.iCXIdM > div > div.sc-1m0b17d-28.bXpBxr > div > div > div > div.sc-1m0b17d-6.eLLAYK > button:nth-child(2) > span").innerText).toISOString().slice(0, 10);
        const title = document.querySelector("#root > main > div.gkniq1-0.bJPDVi > div > div.sc-13rgbhb-4.iCXIdM > div > div.sc-1m0b17d-27.kZecfp > div > div.sc-1m0b17d-12.gshGkS > div.sc-1m0b17d-29.jlABQc > h1").innerText.toLocaleLowerCase();
        const nfo = createNFO({
            simples: {
                title,
                plot: document.querySelector("#root > main > div.gkniq1-0.bJPDVi > div > div.sc-13rgbhb-4.iCXIdM > div > div.sc-1m0b17d-28.bXpBxr > div > div > div > div.sc-1m0b17d-23.euQiEd").innerText,
                year: fecha.slice(0, 4),
                aired: fecha,
            },
            multiples: {
                studio: [getsite()],
            },
            actors: Array.prototype.map.call(document.querySelectorAll("div.gkniq1-0.bJPDVi > div > div.sc-13rgbhb-4.iCXIdM > div > div.sc-1m0b17d-27.kZecfp > div > div.sc-1m0b17d-12.gshGkS > div.sc-1m0b17d-18.dBimpz > a"), x => x.innerText),
        });
        // const todown = title;
        const todown = await navigator.clipboard.readText();
        download(`${todown.replace(/ /g,'_')}.nfo`, nfo);
        console.log(nfo);
        downloadURI(document.querySelector("#root > main > div:nth-child(4) > div.pb6v16-0.lloion.sc-1lobdef-0.klqbXl.sc-1qki440-1.hKcQMm > div.sc-1lobdef-1.bqaIFc.swiper-container.swiper-container-initialized.swiper-container-horizontal > div > div:nth-child(4) > img").src, `${todown.replace(/ /g,'_')}.jpg`);
        return nfo;
    }
    async function mylf() {
        const fecha = new Date(document.querySelector("#root > div > div.container.pt-lg-5.pt-4.video-page > div.row.py-3 > div:nth-child(3)").innerText).toISOString().slice(0, 10);
        const title = document.querySelector("#root > div > div.container.pt-lg-5.pt-4.video-page > div.row.py-3 > div.col-12.sceneTitle").innerText.toLocaleLowerCase();
        const nfo = createNFO({
            simples: {
                title,
                plot: document.querySelector("#root > div > div.container.pt-lg-5.pt-4.video-page > div:nth-child(3) > div").innerText,
                year: fecha.slice(0, 4),
                aired: fecha,
            },
            multiples: {
                studio: [getsite(),document.querySelector("#root > div > div.container.pt-lg-5.pt-4.video-page > div.row.py-3 > div.col-6.sceneDate.text-right > div > a").innerText.toLocaleLowerCase()],
            },
            actors: Array.prototype.map.call(document.querySelectorAll("#root > div > div.container.pt-lg-5.pt-4.video-page > div.row.py-3 > div.col-12.contentTitle > a"), x => x.innerText),
        });
        // const todown = title;
        const todown = await navigator.clipboard.readText();
        download(`${todown}.nfo`, nfo);
        console.log(nfo);
        downloadURI(document.querySelector('div.stream-video-container > stream').getAttribute('poster'), `${todown}.jpg`);
        return nfo;
    }

    async function data18() {
        const fecha = new Date(document.querySelector("#centered > div.p8 > div:nth-child(7) > div:nth-child(3) > p:nth-child(2) > span").innerText.slice(14)).toISOString().slice(0, 10);
        const title = document.querySelector("#centered > div.p8 > div:nth-child(1) > h1").innerText.toLocaleLowerCase();
        const plotele = document.querySelector("#centered > div.p8 > div:nth-child(7) > div:nth-child(3) > div.gen12 > p");
        const nfo = createNFO({
            simples: {
                title,
                plot: plotele?plotele.lastChild.data.trim():title,
                year: fecha.slice(0, 4),
                aired: fecha,
            },
            multiples: {
                studio: [getsite()],
            },
            actors: Array.prototype.map.call(document.querySelectorAll("#centered > div.p8 > div:nth-child(7) > div:nth-child(3) > p > a.bold"), x => x.innerText),
        });
        // const todown = title;
        const todown = navigator.clipboard ? (await navigator.clipboard.readText()):title;
        download(`${todown}.nfo`, nfo);
        console.log(nfo);
        downloadURI(document.querySelector("#moviewrap > img").src, `${todown}.jpg`);
        return nfo;
    }
    function getsite(){
        return window.location.host.match(/(?<site>[a-z0-9-]+)\.[a-z]+$/)[1];
    }


	async function thirdmov() {
        const fecha = new Date(document.querySelector("body > div.main-content > div:nth-child(3) > div:nth-child(3) > div.col-xs-12.col-sm-7.col-lg-7.col-feat-left.col-feat > div:nth-child(2) > span").innerText.trim().slice(9)).toISOString().slice(0, 10);
        const title = document.querySelector("body > div.main-content > div:nth-child(3) > div:nth-child(2) > div > span > a").innerText.toLocaleLowerCase();
        const nfo = createNFO({
            simples: {
                title,
                plot: document.querySelector("body > div.main-content > div:nth-child(3) > div:nth-child(3) > div.col-xs-12.col-sm-7.col-lg-7.col-feat-left.col-feat > div.bg-color-3.box-padding > div > div.col-xs-12.col-sm-12.col-lg-12.col-mov-desc > p").innerText,
                year: fecha.slice(0, 4),
                aired: fecha,
            },
            multiples: {
                studio: [getsite()],
            },
            actors: Array.prototype.map.call(document.querySelectorAll("body > div.main-content > div:nth-child(3) > div:nth-child(3) > div.col-xs-12.col-sm-7.col-lg-7.col-feat-left.col-feat > div.bg-color-3.box-padding > div > div.col-xs-12.col-sm-8.col-lg-9.col-mov-desc > p:nth-child(2) > span > a"), x => x.innerText),
        });
        // const todown = title;
        let todown = navigator.clipboard ? (await navigator.clipboard.readText()):document.querySelector("body > div.main-content > div:nth-child(3) > div:nth-child(2) > div > a").innerText+title;
        todown = todown.replace(/\s+/g,'_');
        download(`${todown}.nfo`, nfo);
        console.log(nfo);
        downloadURI(document.querySelector("#player_members_jwplayer_display_image").src, `${todown}.jpg`);
        return nfo;
    }

    async function mofos() {
        // const fecha = new Date(document.querySelector("#root > div.sc-1mhpkp8-1.bqyXak > div.sc-1mhpkp8-1.bqyXak > div:nth-child(1) > div > section > div > div > div.sc-1b6bgon-1.fvOIom").innerText.trim()).toISOString().slice(0, 10);
        const fecha = new Date(document.querySelector("#root > div.sc-yo7o1v-0.kSWYZk > div.sc-yo7o1v-0.kSWYZk > div > div.sc-1deoyo3-0.kKAXRY > div:nth-child(2) > div > section > div > div > h2.sc-1b6bgon-0.eDgMkd").innerText.trim()).toISOString().slice(0, 10);
        const title = document.querySelector("#root > div.sc-yo7o1v-0.kSWYZk > div.sc-yo7o1v-0.kSWYZk > div > div.sc-1deoyo3-0.kKAXRY > div:nth-child(2) > div > section > div > div > h2.font-primary.sc-1b6bgon-2.QFzbT").innerText.toLocaleLowerCase();
        const nfo = createNFO({
            simples: {
                title,
                plot: document.querySelector("#root > div.sc-yo7o1v-0.kSWYZk > div.sc-yo7o1v-0.kSWYZk > div > div.sc-1deoyo3-0.kKAXRY > div.sc-1fep8qc-0.ekNhDD > div > section > div > p")?.innerText,
                year: fecha.slice(0, 4),
                aired: fecha,
            },
            multiples: {
                studio: [getsite()],
            },
            actors: Array.prototype.map.call(document.querySelectorAll("#root > div.sc-yo7o1v-0.kSWYZk > div.sc-yo7o1v-0.kSWYZk > div > div.sc-1deoyo3-0.kKAXRY > div:nth-child(2) > div > section > div > div > h2.sc-1b6bgon-3.ipuugj > span > a"), x => x.innerText),
        });
        // const todown = title;
        let todown = navigator.clipboard ? (await navigator.clipboard.readText()):document.querySelector("body > div.main-content > div:nth-child(3) > div:nth-child(2) > div > a").innerText+title;
        todown = todown.replace(/\s+/g,'_');
        todown = todown.match(/[^\\]+$/)[0];
        if(todown.lastIndexOf('.')>=0){
            todown = todown.slice(0,todown.lastIndexOf('.'));
        }
        download(`${todown}.nfo`, nfo);
        console.log(nfo);
        downloadURI(document.querySelector("div.App div.vjs-poster").style['backgroundImage'].slice(5,-2), `${todown}.jpg`);
        return nfo;
    }

    async function videosz() {
        const fecha = new Date(document.querySelector('span[itemprop=datePublished]').innerText.trim()).toISOString().slice(0, 10);
        const title = document.querySelector("span[itemprop=name].blue.ucwords").textContent.split(' ').map(x=>x.trim().toLocaleLowerCase()).filter(x=>!!x).join(' ');
        const nfo = createNFO({
            simples: {
                title,
                plot: document.querySelector("#root > div.sc-1mhpkp8-1.bqyXak > div.sc-1mhpkp8-1.bqyXak > div:nth-child(3) > div > section > div > p")?.innerText || title,
                year: fecha.slice(0, 4),
                aired: fecha,
            },
            multiples: {
                studio: [getsite(), document.querySelector("span[itemprop=productionCompany]").innerText.toLocaleLowerCase()],
                tag: [],
            },
            actors: Array.prototype.map.call(document.querySelectorAll("span[itemprop=actor]"), x => x.innerText),
        });
        // const todown = title;
        let todown = navigator.clipboard ? (await navigator.clipboard.readText()):document.querySelector("body > div.main-content > div:nth-child(3) > div:nth-child(2) > div > a").innerText+title;
        todown = todown.replace(/\s+/g,'_');
        todown = todown.match(/[^\\]+$/)[0];
        if(todown.lastIndexOf('.')>=0){
            todown = todown.slice(0,todown.lastIndexOf('.'));
        }
        download(`${todown}.nfo`, nfo);
        console.log(nfo);
        downloadURI(document.querySelector("head > link[rel=image_src]").href, `${todown}.jpg`);
        return nfo;
    }

    async function nubiles() {
        const fecha = new Date(document.querySelector("div.container div.clearfix span.date").innerText.trim()).toISOString().slice(0, 10);
        const title = document.querySelector("div.container div.row.content-pane-container div.content-pane-title h2").textContent.split(' ').map(x=>x.trim().toLocaleLowerCase()).filter(x=>!!x).join(' ');
        const nfo = createNFO({
            simples: {
                title,
                plot: document.querySelector("div.container div.row.content-pane-container div.col-12.content-pane-column div").textContent.trim() || title,
                year: fecha.slice(0, 4),
                aired: fecha,
            },
            multiples: {
                studio: [getsite(), document.querySelector("div.container div.content-pane-title a.site-link").innerText.toLocaleLowerCase()],
                tag: Array.from(document.querySelectorAll("div.container div.row div.categories > a")).map(x=>x.innerText.toLocaleLowerCase()),
            },
            actors: Array.prototype.map.call(document.querySelectorAll("div.container div.content-pane-title div.content-pane-performers a"), x => x.innerText),
        });
        // const todown = title;
        let todown = navigator.clipboard ? (await navigator.clipboard.readText()):title;
        todown = todown.replace(/\s+/g,'_');
        todown = todown.match(/[^\\]+$/)[0];
        if(todown.lastIndexOf('.')>=0){
            todown = todown.slice(0,todown.lastIndexOf('.'));
        }
        download(`${todown}.nfo`, nfo);
        console.log(nfo);
        downloadURI(document.querySelector("div.vjs-poster").style['backgroundImage'].slice(5,-2), `${todown}.jpg`);
        return nfo;
    }

    async function exotic4k() {
        let fe = document.querySelector("#release-page div > div.release-rank ul > li abbr");
        const fecha = (fe?new Date(fe.innerText.trim()): new Date()).toISOString().slice(0, 10);
        const title = document.querySelector("#release-page > div > div > div.release-info > div > h1").textContent.split(' ').map(x=>x.trim().toLocaleLowerCase()).filter(x=>!!x).join(' ');
        const nfo = createNFO({
            simples: {
                title,
                plot: title,
                year: fecha.slice(0, 4),
                aired: fecha,
            },
            multiples: {
                studio: [getsite()],
            },
            actors: Array.prototype.map.call(document.querySelectorAll("#release-page > div > div > div.release-info > div > a"), x => x.innerText),
        });
        // const todown = title;
        let todown = navigator.clipboard ? (await navigator.clipboard.readText()):title;
        todown = todown.replace(/\s+/g,'_');
        todown = todown.match(/[^\\]+$/)[0];
        if(todown.lastIndexOf('.')>=0){
            todown = todown.slice(0,todown.lastIndexOf('.'));
        }
        download(`${todown}.nfo`, nfo);
        console.log(nfo);
        downloadURI(document.querySelector("#player-wrapper > div > div.plyr__video-wrapper > video").getAttribute('poster'), `${todown}.jpg`);
        return nfo;
    }

    const site = getsite();
    console.log(site);
    if (site === 'teamskeet') {
        teamskeettest();
    } else if (site === 's223pyfam') {
        spyfam();
    } else if (site === 'realitykings') {
        realitykings();
    } else if (site === 'naughtyamerica') {
        naughtyamerica();
    } else if (['familysinners','digitalplayground','propertysex','babes', 'twistys', 'mofos'].includes(site)) {
        if (window.location.host.startsWith('site-ma')) {
            mofos();
        }else {
            familysinners();
        }
    } else if (site === 'bangbros') {
        bangbros();
    } else if (site === 'brazzers') {
        brazzers();
    } else if (site === 'vixen' || site === 'tushy') {
        vixen();
    } else if (site === 'mylf') {
        mylf();
    } else if (site==='data18'){
    	data18();
    } else if (site==='thirdmovies'){
    	thirdmov();
    } else if (site==='videosz'){
        videosz();
    } else if (site==='nubiles-porn') {
        nubiles();
    } else if (['exotic4k', 'spyfam','tiny4k','pornpros','povd','lubed','puremature', 'castingcouch-x'].includes(site)) {
        exotic4k();
    }
})()
