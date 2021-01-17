// Obselete; awaiting cleanup
// function getWarData(war_number) {
//   let header = ["Name", "Cards Earned", "CD Battles", "Total battles", "WD Win", "WD Miss"]
//   let response = getAPIData('clans/' + clan_tag + '/warlog')
//   let all_wars_data = response.items
//   let war = all_wars_data[war_number-1]
//   let participants = war.participants
//   let war_data = [header]
//   let d = war.createdDate
//   let date_str = `${d.slice(0,4)}-${d.slice(4, 6)}-${d.slice(6, 8)}T${d.slice(9, 11)}:${d.slice(11, 13)}:${d.slice(13, 15)}Z`
//   let war_date = new Date(date_str)
//   for (let i = 0; i < participants.length; i++) {
//     let data = participants[i]
//     war_data.push([data.name, data.cardsEarned, data.collectionDayBattlesPlayed, data.numberOfBattles, data.wins, data.numberOfBattles - data.battlesPlayed])
//   }
//   return {'war_data': war_data, 'date':war_date}
// }

// Obselete; awaiting cleanup
// Usage in main: setWarData()
// function setWarData() {
//   for(let i = 1; i <= 10; i++) {
//     let sheet_name = i.toString(10)
//     let data = getWarData(i)
//     recordData(data.war_data, sheet_name, {'row':1, 'col':1})
//     spreadsheet.getSheetByName(sheet_name).getRange(1, 7).setValue(data.date)
//   }
// }
