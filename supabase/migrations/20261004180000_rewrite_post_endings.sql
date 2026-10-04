-- Replace only the final paragraph of 28 posts. INEOS is left unchanged.
update public.posts
set content_md = replace(content_md, $ccend$Overall, the case shows how the move to digital products is changing what consumers actually get when they pay, and how the wording on a checkout button and the arbitration clause in the terms behind it can decide whether a claim like this ever reaches a court.$ccend$, $ccend$The arbitration motion may decide the case before the ownership question does. If it succeeds, the wording on the checkout button may never be tested in court.$ccend$)
where status = 'published'
  and title = $ccend$Sony and the Ownership of Digital Games$ccend$
  and content_md like $ccend$%Overall, the case shows how the move to digital products is changing what consumers actually get when they pay, and how the wording on a checkout button and the arbitration clause in the terms behind it can decide whether a claim like this ever reaches a court.$ccend$;

update public.posts
set content_md = replace(content_md, $ccend$Overall, the claims show how a single court ruling on a contract term can open the door to mass damages actions across several countries, and how different collective action models in the Netherlands and the UK are making large platforms a major target for litigation.$ccend$, $ccend$A single ruling on a contract term has opened the door to damages claims in more than one country. Of the two, the UK claim carries the greater exposure, because an opt-out claim covers every consumer in the class unless they choose to leave.$ccend$)
where status = 'published'
  and title = $ccend$Booking.com and the Price Parity Claims$ccend$
  and content_md like $ccend$%Overall, the claims show how a single court ruling on a contract term can open the door to mass damages actions across several countries, and how different collective action models in the Netherlands and the UK are making large platforms a major target for litigation.$ccend$;

update public.posts
set content_md = replace(content_md, $ccend$Overall, the Al-Hilal sale is a useful example of how Saudi Arabia is using state money to grow its clubs before selling them to private investors, and it will likely be the model for any future sale of Al-Nassr, Al-Ittihad and Al-Ahli.$ccend$, $ccend$The sale is likely to be the model for Al-Nassr, Al-Ittihad and Al-Ahli: clubs built up with state money, then sold to private investors while the state keeps an interest.$ccend$)
where status = 'published'
  and title = $ccend$PIF's Sale of Al-Hilal to Kingdom Holding$ccend$
  and content_md like $ccend$%Overall, the Al-Hilal sale is a useful example of how Saudi Arabia is using state money to grow its clubs before selling them to private investors, and it will likely be the model for any future sale of Al-Nassr, Al-Ittihad and Al-Ahli.$ccend$;

update public.posts
set content_md = replace(content_md, $ccend$Overall, the episode shows the limits of commercialising a sports governing body and that the real power within FIFA sits with its member associations, who can both block a president's plans and decide his future.$ccend$, $ccend$The real power within FIFA sits with its member associations. They were able to block the president's plan, and they will decide his future at the Congress in Rabat in March 2027.$ccend$)
where status = 'published'
  and title = $ccend$FIFA's Failed World Cup Stake Sale and the Fallout for Infantino$ccend$
  and content_md like $ccend$%Overall, the episode shows the limits of commercialising a sports governing body and that the real power within FIFA sits with its member associations, who can both block a president's plans and decide his future.$ccend$;

update public.posts
set content_md = replace(content_md, $ccend$Overall, the deal shows how American owners are using minority sales to realise value from their clubs without giving up control, and how record valuations are drawing some of the world's wealthiest investors into English football.$ccend$, $ccend$Minority sales let American owners realise value from their clubs without giving up control. At record valuations, they are also bringing some of the world's wealthiest investors into English football.$ccend$)
where status = 'published'
  and title = $ccend$Bezos-Backed Consortium Buys into Liverpool$ccend$
  and content_md like $ccend$%Overall, the deal shows how American owners are using minority sales to realise value from their clubs without giving up control, and how record valuations are drawing some of the world's wealthiest investors into English football.$ccend$;

update public.posts
set content_md = replace(content_md, $ccend$Overall, the deal shows how regulation can shape the entire structure of a takeover, and how private equity buyers are finding ways to invest in heavily regulated industries without taking formal control.$ccend$, $ccend$Regulation shaped the entire structure of this deal. It gives other private equity buyers a model for investing in heavily regulated industries without taking formal control.$ccend$)
where status = 'published'
  and title = $ccend$Apollo's Takeover of easyJet$ccend$
  and content_md like $ccend$%Overall, the deal shows how regulation can shape the entire structure of a takeover, and how private equity buyers are finding ways to invest in heavily regulated industries without taking formal control.$ccend$;

update public.posts
set content_md = replace(content_md, $ccend$Overall, the Thames Water crisis shows how a company with too much debt can end up controlled by its lenders, and how the government's power to step in shapes the negotiations.$ccend$, $ccend$Thames Water's lenders now hold the strongest position in the negotiations, but the government's power to step in sets the limits of any deal they can reach.$ccend$)
where status = 'published'
  and title = $ccend$Thames Water's Debt Crisis$ccend$
  and content_md like $ccend$%Overall, the Thames Water crisis shows how a company with too much debt can end up controlled by its lenders, and how the government's power to step in shapes the negotiations.$ccend$;

update public.posts
set content_md = replace(content_md, $ccend$Overall, the transaction shows the gap between signing a deal and completing it in a regulated sector. DMGT had an agreed price, but the regulatory review left room for a rival bidder whose own profile raised fewer concerns.$ccend$, $ccend$DMGT had an agreed price and still lost the deal. In a regulated sector, signing is only the first step, and the review left room for a rival bidder whose profile raised fewer concerns.$ccend$)
where status = 'published'
  and title = $ccend$DMGT's Bid for the Telegraph$ccend$
  and content_md like $ccend$%Overall, the transaction shows the gap between signing a deal and completing it in a regulated sector. DMGT had an agreed price, but the regulatory review left room for a rival bidder whose own profile raised fewer concerns.$ccend$;

update public.posts
set content_md = replace(content_md, $ccend$Overall, the case shows that an agreed contract is only as good as the approval behind it. Like a regulatory condition in an M&A deal, La Liga's registration requirement meant the agreement between Messi and Barcelona could never be completed.$ccend$, $ccend$An agreed contract is only as good as the approval behind it. Like a regulatory condition in an M&A deal, La Liga's registration requirement meant the agreement between Messi and Barcelona could never be completed.$ccend$)
where status = 'published'
  and title = $ccend$Why Messi Left Barcelona$ccend$
  and content_md like $ccend$%Overall, the case shows that an agreed contract is only as good as the approval behind it. Like a regulatory condition in an M&A deal, La Liga's registration requirement meant the agreement between Messi and Barcelona could never be completed.$ccend$;

update public.posts
set content_md = replace(content_md, $ccend$Overall, the deal shows how bank sales are shaped not only by price but by the seller's wider position, with Sabadell's sale as much about defending itself against BBVA as the value it received.$ccend$, $ccend$Sabadell's sale was as much about defending itself against BBVA as about the price it received. Bank sales are rarely decided on price alone.$ccend$)
where status = 'published'
  and title = $ccend$Santander's Acquisition of TSB$ccend$
  and content_md like $ccend$%Overall, the deal shows how bank sales are shaped not only by price but by the seller's wider position, with Sabadell's sale as much about defending itself against BBVA as the value it received.$ccend$;

update public.posts
set content_md = replace(content_md, $ccend$Overall, the transaction is a useful example of how hostile takeover tactics still operate in modern M&A, particularly where companies are competing for scale and market power.$ccend$, $ccend$The deal is a reminder that hostile tactics still work in large M&A, particularly where bidders are competing for scale and market power.$ccend$)
where status = 'published'
  and title = $ccend$Paramount's Acquisition of Warner Bros. Discovery$ccend$
  and content_md like $ccend$%Overall, the transaction is a useful example of how hostile takeover tactics still operate in modern M&A, particularly where companies are competing for scale and market power.$ccend$;

update public.posts
set content_md = replace(content_md, $ccend$Overall, the round shows the scale of capital AI companies now need and how closely the largest technology companies are tied together.$ccend$, $ccend$The round shows how much capital AI companies now need. It also shows how closely the largest technology companies are tied to each other, as investors, suppliers and customers at the same time.$ccend$)
where status = 'published'
  and title = $ccend$OpenAI's $122 Billion Funding Round$ccend$
  and content_md like $ccend$%Overall, the round shows the scale of capital AI companies now need and how closely the largest technology companies are tied together.$ccend$;

update public.posts
set content_md = replace(content_md, $ccend$Overall, the case shows how US courts approach tech monopolies, preferring rules on conduct over breaking companies up, and it offers a useful comparison with the UK's new digital markets regime.$ccend$, $ccend$The court preferred rules on conduct to breaking the company up, an approach close to the UK's new digital markets regime.$ccend$)
where status = 'published'
  and title = $ccend$The US Google Search Case$ccend$
  and content_md like $ccend$%Overall, the case shows how US courts approach tech monopolies, preferring rules on conduct over breaking companies up, and it offers a useful comparison with the UK's new digital markets regime.$ccend$;

update public.posts
set content_md = replace(content_md, $ccend$Overall, the deal is a clear example of a private equity buy-and-build exit, and of banks looking to fee-based income as interest rates fall.$ccend$, $ccend$The sale follows a familiar private equity pattern: build a business through acquisitions, then sell it to a strategic buyer. For NatWest, it adds fee income as falling interest rates put pressure on lending.$ccend$)
where status = 'published'
  and title = $ccend$NatWest's Acquisition of Evelyn Partners$ccend$
  and content_md like $ccend$%Overall, the deal is a clear example of a private equity buy-and-build exit, and of banks looking to fee-based income as interest rates fall.$ccend$;

update public.posts
set content_md = replace(content_md, $ccend$Overall, the collapse shows that even when the strategic case for a deal is clear, disagreements over price and control can end talks at the last moment, and how the Takeover Code's deadlines force both sides to reach a decision quickly.$ccend$, $ccend$Even when the strategic case for a deal is clear, disagreements over price and control can end talks at the last moment. The Takeover Code's deadlines mean those disagreements have to be resolved quickly or not at all.$ccend$)
where status = 'published'
  and title = $ccend$Rio Tinto and Glencore's Failed Merger$ccend$
  and content_md like $ccend$%Overall, the collapse shows that even when the strategic case for a deal is clear, disagreements over price and control can end talks at the last moment, and how the Takeover Code's deadlines force both sides to reach a decision quickly.$ccend$;

update public.posts
set content_md = replace(content_md, $ccend$Overall, Saudi Arabia's investment shows how sport has become part of a wider national strategy, and how regulators are having to decide where sponsorship ends and control begins.$ccend$, $ccend$Saudi Arabia's investment in sport is part of a wider national strategy. For regulators, the key question is where sponsorship ends and control begins.$ccend$)
where status = 'published'
  and title = $ccend$Saudi Arabia's Move into Tennis and Football$ccend$
  and content_md like $ccend$%Overall, Saudi Arabia's investment shows how sport has become part of a wider national strategy, and how regulators are having to decide where sponsorship ends and control begins.$ccend$;

update public.posts
set content_md = replace(content_md, $ccend$Overall, the ruling allows the PSR to move on to setting the level of the cap, and shows how judicial review is used to test the limits of a regulator's powers.$ccend$, $ccend$The ruling clears the way for the PSR to set the level of the cap. It is also a clear example of judicial review being used to test the limits of a regulator's powers.$ccend$)
where status = 'published'
  and title = $ccend$Visa, Mastercard and Revolut v PSR$ccend$
  and content_md like $ccend$%Overall, the ruling allows the PSR to move on to setting the level of the cap, and shows how judicial review is used to test the limits of a regulator's powers.$ccend$;

update public.posts
set content_md = replace(content_md, $ccend$Overall, the Glazers' ownership of both clubs shows how the way a club is financed can shape its fortunes for decades, and how English football has moved closer to the stricter approach long taken in the NFL.$ccend$, $ccend$The way each club was financed has shaped its fortunes for decades. With the Acquisition Leverage Test, English football has moved closer to the stricter approach the NFL has taken for years.$ccend$)
where status = 'published'
  and title = $ccend$The Glazers, Manchester United and the Buccaneers$ccend$
  and content_md like $ccend$%Overall, the Glazers' ownership of both clubs shows how the way a club is financed can shape its fortunes for decades, and how English football has moved closer to the stricter approach long taken in the NFL.$ccend$;

update public.posts
set content_md = replace(content_md, $ccend$Overall, the deal shows how private credit lenders are willing to lend against unusual assets where their value is reliable.$ccend$, $ccend$Private credit lenders are willing to lend against unusual assets, provided their value is reliable. Heathrow slots, which rarely come up for sale, meet that test.$ccend$)
where status = 'published'
  and title = $ccend$Virgin Atlantic's Heathrow Slot Financing$ccend$
  and content_md like $ccend$%Overall, the deal shows how private credit lenders are willing to lend against unusual assets where their value is reliable.$ccend$;

update public.posts
set content_md = replace(content_md, $ccend$Overall, the deal works much like an earn-out, with part of Messi's pay depending on the value he brings, and shows how league rules shape player deals just as La Liga's rules shaped his exit from Barcelona.$ccend$, $ccend$The contract works much like an earn-out, with part of Messi's pay tied to the value he brings. As with his exit from Barcelona, the league's rules shaped the deal as much as the club did.$ccend$)
where status = 'published'
  and title = $ccend$Messi's Inter Miami Contract$ccend$
  and content_md like $ccend$%Overall, the deal works much like an earn-out, with part of Messi's pay depending on the value he brings, and shows how league rules shape player deals just as La Liga's rules shaped his exit from Barcelona.$ccend$;

update public.posts
set content_md = replace(content_md, $ccend$Overall, the deal shows how a final offer and a scheme of arrangement give a UK takeover a clear path to completion, and how lower valuations in London continue to attract overseas buyers.$ccend$, $ccend$A final offer and a scheme of arrangement gave the deal a clear path to completion. It is also another example of lower valuations in London attracting overseas buyers.$ccend$)
where status = 'published'
  and title = $ccend$DoorDash's Acquisition of Deliveroo$ccend$
  and content_md like $ccend$%Overall, the deal shows how a final offer and a scheme of arrangement give a UK takeover a clear path to completion, and how lower valuations in London continue to attract overseas buyers.$ccend$;

update public.posts
set content_md = replace(content_md, $ccend$Overall, the BHP bid shows how a complicated deal structure and political risk can sink a takeover, and how the Takeover Code's deadlines force a bidder to either commit or step away.$ccend$, $ccend$A complicated structure and political risk made the bid hard to deliver. When the Takeover Code deadline arrived, BHP had to commit or step away, and it stepped away.$ccend$)
where status = 'published'
  and title = $ccend$BHP's Failed Bid for Anglo American$ccend$
  and content_md like $ccend$%Overall, the BHP bid shows how a complicated deal structure and political risk can sink a takeover, and how the Takeover Code's deadlines force a bidder to either commit or step away.$ccend$;

update public.posts
set content_md = replace(content_md, $ccend$Overall, the deals show how staged sales let long-standing owners step back gradually while buyers pay record prices for control of the world's most valuable sports teams.$ccend$, $ccend$Staged sales let long-standing owners step back gradually, while buyers pay record prices for control of some of the most valuable teams in sport.$ccend$)
where status = 'published'
  and title = $ccend$Record Sales of the Celtics and the Lakers$ccend$
  and content_md like $ccend$%Overall, the deals show how staged sales let long-standing owners step back gradually while buyers pay record prices for control of the world's most valuable sports teams.$ccend$;

update public.posts
set content_md = replace(content_md, $ccend$Overall, the deal shows how insurance mergers need sign-off from several regulators, and how confident parties can plan their timetable around an expected clearance.$ccend$, $ccend$Insurance mergers need sign-off from several regulators. Aviva was confident enough of the CMA's decision to plan its timetable around it, and completed the day after clearance.$ccend$)
where status = 'published'
  and title = $ccend$Aviva's Acquisition of Direct Line$ccend$
  and content_md like $ccend$%Overall, the deal shows how insurance mergers need sign-off from several regulators, and how confident parties can plan their timetable around an expected clearance.$ccend$;

update public.posts
set content_md = replace(content_md, $ccend$Overall, the Royal Mail takeover shows how the National Security and Investment Act gives the government a real say in deals involving important UK businesses, and how a buyer can win approval by agreeing to binding conditions.$ccend$, $ccend$The National Security and Investment Act gave the government a real say in this deal. Kretinsky won approval, but only by agreeing to binding conditions.$ccend$)
where status = 'published'
  and title = $ccend$Daniel Kretinsky's Takeover of Royal Mail$ccend$
  and content_md like $ccend$%Overall, the Royal Mail takeover shows how the National Security and Investment Act gives the government a real say in deals involving important UK businesses, and how a buyer can win approval by agreeing to binding conditions.$ccend$;

update public.posts
set content_md = replace(content_md, $ccend$Overall, the case shows how copyright law protects not just the games themselves but the technology built to stop them being copied, and why companies like Nintendo target the sellers of these devices rather than the individual players using them.$ccend$, $ccend$Copyright law protects not just the games but the technology built to stop them being copied. That is why companies like Nintendo pursue the sellers of these devices rather than the players using them.$ccend$)
where status = 'published'
  and title = $ccend$Nintendo v Playables and the R4 Card$ccend$
  and content_md like $ccend$%Overall, the case shows how copyright law protects not just the games themselves but the technology built to stop them being copied, and why companies like Nintendo target the sellers of these devices rather than the individual players using them.$ccend$;

update public.posts
set content_md = replace(content_md, $ccend$Overall, the Everton takeover shows how the Premier League's owners' test can stop a buyer that cannot prove its funding, and how a club's debts can grow while a sale is stuck.$ccend$, $ccend$The owners' test stopped a buyer that could not prove its funding. While the sale was stuck, the club's debts kept growing.$ccend$)
where status = 'published'
  and title = $ccend$The Friedkin Group's Takeover of Everton$ccend$
  and content_md like $ccend$%Overall, the Everton takeover shows how the Premier League's owners' test can stop a buyer that cannot prove its funding, and how a club's debts can grow while a sale is stuck.$ccend$;

update public.posts
set content_md = replace(content_md, $ccend$Overall, the NFL's approach shows a league opening up to outside capital while keeping tight control over who owns its teams, in contrast to English football where private equity firms can buy clubs outright.$ccend$, $ccend$The NFL is opening up to outside capital while keeping tight control over who owns its teams. English football has taken a different approach, allowing private equity firms to buy clubs outright.$ccend$)
where status = 'published'
  and title = $ccend$Private Equity Enters the NFL$ccend$
  and content_md like $ccend$%Overall, the NFL's approach shows a league opening up to outside capital while keeping tight control over who owns its teams, in contrast to English football where private equity firms can buy clubs outright.$ccend$;
