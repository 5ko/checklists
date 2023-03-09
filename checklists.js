/**
 *  Ephemeral checkists for PmWiki
 *  Written by (2022) Petko Yotov www.pmwiki.org/petko
 *
 *  This text is written for PmWiki; you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published
 *  by the Free Software Foundation; either version 3 of the License, or
 *  (at your option) any later version. See pmwiki.php for full details
 *  and lack of warranty.
 *
 *  Copyright 2022 Petko Yotov pmwiki.org/petko
 *  Version: 20220611
 */

var ChkJS = document.currentScript;
function makechecklists(){
  var a = (ChkJS && ChkJS.dataset.i18n)
    ? ChkJS.dataset.i18n.split(/;/g)
    : ['Checklist', 'Toggle all', 'Done'];
  var Checklist = a[0], ToggleAll = a[1], Done = a[2];
  var chkrx = new RegExp('^\\s*\\[(?:'+Checklist+')(3?)\\]', 'i');
  
  var uls = document.querySelectorAll('ul:not(.pmchecklist)');
  for(var i=0; i<uls.length; i++) {
    var ul = uls[i];
    if(ul.closest('[contenteditable]')) continue;
    if(ul.querySelector('ul,ol')) continue;
    onelist(ul);
  }
  
  function onelist(ul) {
    var a = ul.textContent.match(chkrx);
    if(! a) return;
    var tristate = a[1]? true: false;
    ul.classList.add('pmchecklist');
    
    ul.children[0].innerHTML = '<span class="pmcheckall">'+ToggleAll+'</span>';
    
    for(var j=1; j<ul.children.length; j++) {
      var item = ul.children[j];
      item.dataset.done = 0;
      item.dataset.position = j;
      item.addEventListener('click', checkitem);
    }
    
    ul.insertAdjacentHTML('beforeend', '<li class="done-separator"><span>'+Done+'</span></li>');
    var bar = ul.querySelector('.done-separator');
    
    function replaceitem(li) {
      if(li.dataset.done==2) {
        return ul.appendChild(li);
      }
      var todo = ul.children;
      var idx = parseInt(li.dataset.position);
      
      var found = bar;
      for(var i=1; i<todo.length; i++) {
        if(todo[i] === bar) break;
        var pos = parseInt(todo[i].dataset.position);
        if(idx>pos) continue;
        found = todo[i];
        break;
      }
      ul.insertBefore(li, found);
    }
    
    ul.querySelector('.pmcheckall').addEventListener('click', function(e){
      var citems = ul.querySelectorAll('li[data-done]');
      var prev = parseInt(citems[citems.length -1].dataset.done);
      var next = (prev + 1) % 3;
      if(next === 1 && !tristate) next = 2;
      
      var tomove = [];
      for(var i=0; i<citems.length; i++) {
        var li = citems[i];
        if(parseInt(li.dataset.done) === next) continue;
        li.dataset.done = next;
        if(next === 1) continue;
        li.classList.add('hlt');
        tomove.push(li);
      }
      if(tomove.length) {
        setTimeout(function(){
          for(var i=0; i<tomove.length; i++) {
            replaceitem(tomove[i]);
          }
        }, 500);
        
        setTimeout(function(){
          for(var i=0; i<tomove.length; i++) {
            tomove[i].classList.remove('hlt');
          }
        }, 1500);
      }
    });
    
    function checkitem(e) {
      var li = this;
      var prev = parseInt(li.dataset.done);
      var next = (prev+1) %3;
      
      if(next === 1) {
        if(tristate) {
          li.dataset.done = next;
          return;
        }
        else next++;
      }
      
      li.classList.add('hlt');
      li.dataset.done = next;
      
      setTimeout(function(){
        li.classList.remove('hlt');
      }, 1500);
      
      setTimeout(function(){
        replaceitem(li);        
      }, 500);
    }
  }
}
// makechecklists() may be called again if content is updated via ajax
document.addEventListener('DOMContentLoaded', makechecklists);

