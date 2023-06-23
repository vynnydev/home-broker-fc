package transformer

import (
	"github.com/vynnydev/homebroker/packages/microservices/market/domain/dtos"
	"github.com/vynnydev/homebroker/packages/microservices/market/domain/entity"
)

func TransformInput(input dtos.TradeInput) *entity.Order {
	asset := entity.NewAsset(input.AssetID, input.AssetID, 1000)
	investor := entity.NewInvestor(input.InvestorID)
	order := entity.NewOrder(input.OrderID, investor, asset, input.Shares, input.Price, input.OrderType)
	if input.CurrentShares > 0 {
		assetPosition := entity.NewInvestorAssetPosition(input.AssetID, input.CurrentShares)
		investor.AddAssetPosition(assetPosition)
	}
	return order
}

func TransformOutput(order *entity.Order) *dtos.OrderOutput {
	output := &dtos.OrderOutput{
		OrderID:    order.ID,
		InvestorID: order.Investor.ID,
		AssetID:    order.Asset.ID,
		OrderType:  order.OrderType,
		Status:     order.Status,
		Partial:    order.PendingShares,
		Shares:     order.Shares,
	}

	var transactionsOutput []*dtos.TransactionOutput
	for _, t := range order.Transactions {
		transactionOutput := &dtos.TransactionOutput{
			TransactionID: t.ID,
			BuyerID:       t.BuyingOrder.Investor.ID,
			SellerID:      t.SellingOrder.Investor.ID,
			AssetID:       t.SellingOrder.Asset.ID,
			Price:         t.Price,
			Shares:        t.SellingOrder.Shares - t.SellingOrder.PendingShares,
		}
		transactionsOutput = append(transactionsOutput, transactionOutput)
	}
	output.TransactionsOutput = transactionsOutput
	return output
}